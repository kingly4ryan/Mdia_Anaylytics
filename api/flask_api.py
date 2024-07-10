from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

# Define root directory path
root_dir = os.path.dirname(os.path.abspath(__file__))  # Adjust as per your structure

@app.route('/')
def hello():
    return 'Welcome to the Flask API!'

@app.route('/instagram-segmentation')
def get_instagram_segmentation():
    segmentation_results_path = os.path.join(root_dir, 'data/instagram_segmentation_results.json')
    return send_from_directory(root_dir, 'data/instagram_segmentation_results.json')

@app.route('/twitter-predictions')
def get_twitter_predictions():
    twitter_results_path = os.path.join(root_dir, 'data/twitter_performance_predictions.json')
    return send_from_directory(root_dir, 'data/twitter_performance_predictions.json')

@app.route('/spotify-predictions')
def get_spotify_predictions():
    spotify_results_path = os.path.join(root_dir, 'data/spotify_churn_predictions.json')
    return send_from_directory(root_dir, 'data/spotify_churn_predictions.json')

if __name__ == '__main__':
    app.run(debug=True)
