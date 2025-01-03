from flask import Flask, request, jsonify
import os
import cv2
import wave
import pyaudio
import speech_recognition as sr
from yt_dlp import YoutubeDL
import subprocess

# Assuming the same constants and functions from your code
ANIMATION_FOLDER = "../minor project/INDIAN SIGN LANGUAGE ANIMATED VIDEOS/"
OUTPUT_FOLDER = "output_v"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app = Flask(__name__)

@app.route('/process_video', methods=['POST'])
def process_video_request():
    try:
        # Retrieve the URL or search query from the request
        data = request.get_json()
        if 'url' in data:
            video_path = download_video_from_url(data['url'], OUTPUT_FOLDER)
        elif 'query' in data:
            video_path = search_and_download_video(data['query'], OUTPUT_FOLDER)
        else:
            return jsonify({"error": "No URL or query provided"}), 400

        if not video_path:
            return jsonify({"error": "Video download failed"}), 400

        # Process the video (same algorithm as before)
        final_video = process_video(video_path)

        if final_video:
            return jsonify({"message": "Sign language video created", "video_path": final_video}), 200
        else:
            return jsonify({"error": "Failed to create sign language video"}), 500

    except Exception as e:
        print(f"Error processing video: {e}")
        return jsonify({"error": str(e)}), 500
    
def download_video_from_url(url, output_folder):
    try:
        options = {
            'format': 'bestvideo+bestaudio/best',
            'outtmpl': os.path.join(output_folder, '%(title)s.%(ext)s'),
            'merge_output_format': 'mp4'
        }
        with YoutubeDL(options) as ydl:
            info = ydl.extract_info(url, download=True)
            video_path = ydl.prepare_filename(info)
            print(f"Video downloaded: {video_path}")
            return video_path
    except Exception as e:
        print(f"Error downloading video: {e}")
        return None

def search_and_download_video(query, output_folder):
    try:
        options = {
            'format': 'bestvideo+bestaudio/best',
            'outtmpl': os.path.join(output_folder, '%(title)s.%(ext)s'),
            'merge_output_format': 'mp4',
            'noplaylist': True
        }
        with YoutubeDL(options) as ydl:
            search_results = ydl.extract_info(f"ytsearch1:{query}", download=True)
            if search_results['entries']:
                video_info = search_results['entries'][0]
                video_path = ydl.prepare_filename(video_info)
                print(f"Video downloaded: {video_path}")
                return video_path
            else:
                print("No videos found for the search query.")
                return None
    except Exception as e:
        print(f"Error searching and downloading video: {e}")
        return None

def extract_audio(video_path, output_audio_path=None):
    try:
        if output_audio_path is None:
            output_audio_path = os.path.splitext(video_path)[0] + ".wav"

        command = [
            "ffmpeg", "-i", video_path, "-vn", "-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2", output_audio_path
        ]
        subprocess.run(command, check=True)
        print(f"Audio extracted to: {output_audio_path}")
        return output_audio_path

    except subprocess.CalledProcessError as e:
        print(f"Error extracting audio with FFmpeg: {e}")
        return None

def transcribe_audio_to_text(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio_data)
            print(f"Transcribed text: {text}")
            return text
        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            print(f"Error with speech recognition: {e}")
        return ""

def map_text_to_animations(text):
    animation_files = []
    for word in text.split():
        word_lower = word.lower()
        word_capitalized = word.capitalize()
        word_animation_path = os.path.join(ANIMATION_FOLDER, f"{word_capitalized}.mp4")
        if os.path.exists(word_animation_path):
            animation_files.append(word_animation_path)
        else:
            print(f"Animation for word '{word}' not found. Checking character-level fallback.")
            for char in word:
                char_lower = char.lower()
                char_capitalized = char.capitalize()
                char_animation_path = os.path.join(ANIMATION_FOLDER, f"{char_capitalized}.mp4")
                if os.path.exists(char_animation_path):
                    animation_files.append(char_animation_path)
                else:
                    print(f"Animation for character '{char}' not found.")
    return animation_files

def concatenate_videos(animation_files, output_video_path):
    try:
        frame_size = None
        fps = 24
        output_video = None

        for animation_file in animation_files:
            cap = cv2.VideoCapture(animation_file)
            if not cap.isOpened():
                print(f"Error opening animation: {animation_file}")
                continue

            if frame_size is None:
                frame_size = (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
                output_video = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, frame_size)

            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                output_video.write(frame)

            cap.release()

        if output_video:
            output_video.release()
            print(f"Generated video: {output_video_path}")
            return output_video_path
        else:
            print("No valid animations to concatenate.")
            return None
    except Exception as e:
        print(f"Error concatenating videos: {e}")
        return None

def process_video(input_video_path):
    print(f"Processing video: {input_video_path}")
    audio_path = os.path.splitext(input_video_path)[0] + ".wav"
    output_video_path = os.path.join(OUTPUT_FOLDER, os.path.basename(input_video_path))

    audio_path = extract_audio(input_video_path, audio_path)
    if not audio_path:
        return None

    text = transcribe_audio_to_text(audio_path)
    if not text:
        return None

    animation_files = map_text_to_animations(text)
    if not animation_files:
        print("No animations mapped to the text.")
        return None

    return concatenate_videos(animation_files, output_video_path)

def main():
    print("Select an option:")
    print("1. Enter a YouTube URL")
    print("2. Search for a video on YouTube")
    choice = input("Enter your choice (1 or 2): ")

    if choice == "1":
        url = input("Enter the YouTube video URL: ")
        video_path = download_video_from_url(url, OUTPUT_FOLDER)
    elif choice == "2":
        query = input("Enter the search query: ")
        video_path = search_and_download_video(query, OUTPUT_FOLDER)
    else:
        print("Invalid choice. Exiting.")
        return

    if video_path:
        final_video = process_video(video_path)
        if final_video:
            print(f"Sign language video created: {final_video}")
        else:
            print("Failed to create sign language video.")
    else:
        print("No video processed.")
@app.route('/upload_video', methods=['POST'])
def upload_video():
    try:
        video_file = request.files['video']
        video_path = os.path.join(OUTPUT_FOLDER, video_file.filename)
        video_file.save(video_path)
        
        final_video = process_video(video_path)

        if final_video:
            return jsonify({"message": "Sign language video created", "video_path": final_video}), 200
        else:
            return jsonify({"error": "Failed to create sign language video"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
