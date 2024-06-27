# Tic Tac Toe Web Application

This is a web-based Tic Tac Toe game built using Flask for the backend and HTML, CSS, and JavaScript for the frontend. The game includes features like theme toggling (classic and modern themes) and tracking the number of wins for each player.

## Features

- Two-player Tic Tac Toe game
- Classic and modern themes
- Win tracking for both players
- Flask backend
- Responsive design

## Requirements

- Python 3.x
- Flask
- pip (Python package installer)
- systemd (for managing the service on Linux)

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/tic-tac-toe.git
cd tic-tac-toe
```

### Install Dependencies

Ensure you have a `requirements.txt` file with the following content:

```plaintext
Flask==2.0.1
```

Then, install the dependencies using pip:

```bash
pip3 install -r requirements.txt
```

### Configure Logging

The application logs are written to `app.log` in the project directory. The logging is configured in the `app.py` file.

### Create Systemd Service File

Create a systemd service file to manage the Flask application:

```ini
[Unit]
Description=Tic Tac Toe Flask Application
After=network.target

[Service]
User=root
Group=root
WorkingDirectory=/path/to/your/tic_tac_toe
ExecStart=/usr/bin/python3 /path/to/your/tic_tac_toe/app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Replace `/path/to/your/tic_tac_toe` with the actual path to your project directory.

### Move the Service File and Enable the Service

```bash
sudo mv tic-tac-toe.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable tic-tac-toe.service
sudo systemctl start tic-tac-toe.service
```

## Usage

Open a web browser and navigate to your server's IP address and port (default is `5000`). For example:

```plaintext
http://your_server_ip:5000
```

### Playing the Game

- Click on the cells to place your mark (X or O).
- The game will automatically check for a win or a draw.
- The win count for each player is displayed at the top.
- Use the "Restart" button to reset the game.
- Use the "Toggle Theme" button to switch between classic and modern themes.

## Logging

Logs are written to `app.log` in the project directory. To view the logs:

```bash
cat app.log
```

Or, to view logs in real-time:

```bash
tail -f app.log
```

### Viewing Systemd Logs

To view logs managed by systemd for the Tic Tac Toe service:

```bash
sudo journalctl -u tic-tac-toe.service
```

To follow the logs in real-time:

```bash
sudo journalctl -u tic-tac-toe.service -f
```

## License

This project is licensed under the GNU license.

## Contributing

Contributions are welcome! Please create a pull request or submit an issue for any changes or suggestions.

---
