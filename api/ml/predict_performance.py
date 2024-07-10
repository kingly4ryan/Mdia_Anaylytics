import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import json
import os

# Define the root directory path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Assuming this script is in 'api/ml'

def instagram_segmentation():
    print("Instagram User Segmentation")
    
    # Load data from JSON
    instagram_data_path = os.path.join(root_dir, 'data/instagram_data.json')
    with open(instagram_data_path, 'r') as json_file:
        instagram_data = json.load(json_file)
    
    # Convert JSON to DataFrame
    instagram_data = pd.DataFrame(instagram_data)
    
    # Calculate average likes and comments
    instagram_data['average_likes'] = instagram_data['likes_count'] / instagram_data.groupby('username')['post_id'].transform('count')
    instagram_data['average_comments'] = instagram_data['comments_count'] / instagram_data.groupby('username')['post_id'].transform('count')
    
    # Select relevant features
    instagram_features = instagram_data[['followers_count', 'average_likes', 'average_comments', 'engagement_rate']].drop_duplicates()
    
    # Normalize the features
    scaler = StandardScaler()
    scaled_instagram_features = scaler.fit_transform(instagram_features)
    
    # Apply K-Means clustering
    kmeans = KMeans(n_clusters=5, random_state=42)
    instagram_features['segment'] = kmeans.fit_predict(scaled_instagram_features)
    
    # Map the segments back to the original data
    instagram_data = instagram_data.merge(instagram_features[['followers_count', 'average_likes', 'average_comments', 'engagement_rate', 'segment']],
                                          on=['followers_count', 'average_likes', 'average_comments', 'engagement_rate'])
    
    # Save the segmentation results to a JSON file
    segmentation_results_path = os.path.join(root_dir, 'data/instagram_segmentation_results.json')
    segmentation_results = instagram_data[['username', 'segment']].drop_duplicates().to_dict(orient='records')
    with open(segmentation_results_path, 'w') as json_file:
        json.dump(segmentation_results, json_file, indent=4)
    
    print(segmentation_results)


def twitter_performance_prediction():
    print("\nTwitter Performance Prediction")
    
    # Load data from JSON
    twitter_users_path = os.path.join(root_dir, 'data/twitter_users.json')
    twitter_tweets_path = os.path.join(root_dir, 'data/twitter_tweets.json')
    
    with open(twitter_users_path, 'r') as json_file:
        twitter_users = json.load(json_file)
    with open(twitter_tweets_path, 'r') as json_file:
        twitter_tweets = json.load(json_file)
    
    # Convert JSON to DataFrames
    twitter_users = pd.DataFrame(twitter_users)
    twitter_tweets = pd.DataFrame(twitter_tweets)
    
    # Calculate engagement metrics
    twitter_tweets['engagement'] = twitter_tweets['retweets_count'] + twitter_tweets['likes_count'] + twitter_tweets['replies_count']
    user_engagement = twitter_tweets.groupby('user_id')['engagement'].mean().reset_index()
    user_engagement.columns = ['user_id', 'average_engagement']
    
    # Merge user data with engagement data
    twitter_data = pd.merge(twitter_users, user_engagement, on='user_id')
    
    # Select features and target
    twitter_features = twitter_data[['followers_count', 'following_count', 'average_engagement']]
    twitter_target = twitter_data['followers_count']  # Predicting followers count as an example
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(twitter_features, twitter_target, test_size=0.2, random_state=42)
    
    # Train model
    twitter_model = LinearRegression()
    twitter_model.fit(X_train, y_train)
    
    # Make predictions
    twitter_predictions = twitter_model.predict(X_test)
    
    # Evaluate model
    twitter_mae = mean_absolute_error(y_test, twitter_predictions)
    twitter_rmse = mean_squared_error(y_test, twitter_predictions, squared=False)
    
    print(f'MAE: {twitter_mae}, RMSE: {twitter_rmse}')
    
    # Save the model results to a JSON file
    twitter_results_path = os.path.join(root_dir, 'data/twitter_performance_predictions.json')
    twitter_results = {'actual': y_test.tolist(), 'predicted': twitter_predictions.tolist()}
    with open(twitter_results_path, 'w') as json_file:
        json.dump(twitter_results, json_file, indent=4)
    
    print(twitter_results)


def spotify_churn_prediction():
    print("\nSpotify Churn Prediction")
    
    # Load data from JSON
    spotify_data_path = os.path.join(root_dir, 'data/spotify_data.json')
    
    with open(spotify_data_path, 'r') as json_file:
        spotify_data = json.load(json_file)
    
    # Convert JSON to DataFrame
    spotify_data = pd.DataFrame(spotify_data)
    
    # Select features and target
    spotify_features = spotify_data[['total_playtime', 'total_songs_played', 'average_session_length', 'playlists_created', 'liked_songs_count', 'skip_rate']]
    spotify_target = spotify_data['churn']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(spotify_features, spotify_target, test_size=0.2, random_state=42)
    
    # Train model
    spotify_model = RandomForestClassifier(random_state=42)
    spotify_model.fit(X_train, y_train)
    
    # Make predictions
    spotify_predictions = spotify_model.predict(X_test)
    
    # Evaluate model
    spotify_accuracy = accuracy_score(y_test, spotify_predictions)
    spotify_report = classification_report(y_test, spotify_predictions)
    
    print(f'Accuracy: {spotify_accuracy}')
    print(f'Classification Report:\n{spotify_report}')
    
    # Save the model results to a JSON file
    spotify_results_path = os.path.join(root_dir, 'data/spotify_churn_predictions.json')
    spotify_results = {'actual': y_test.tolist(), 'predicted': spotify_predictions.tolist()}
    with open(spotify_results_path, 'w') as json_file:
        json.dump(spotify_results, json_file, indent=4)
    
    print(spotify_results)


# Execute functions
instagram_segmentation()
twitter_performance_prediction()
spotify_churn_prediction()
