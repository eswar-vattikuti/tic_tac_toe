from flask import Flask, render_template
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(filename='app.log', level=logging.INFO, format='%(asctime)s %(levelname)s:%(message)s')

@app.route('/')
def home():
    app.logger.info('Home page accessed')
    return render_template('index.html')

if __name__ == '__main__':
    app.logger.info('Starting application')
    app.run(debug=True, host='0.0.0.0')

