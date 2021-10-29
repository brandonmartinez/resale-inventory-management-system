#!/usr/bin/env bash

# Set Session Name
SESSION="RIMS"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

SESSION_WINDOW_LOCAL_SERVERS="Dev"
SESSION_WINDOW_DOCKER="Docker"
SESSION_WINDOW_SHELL="zsh"

# Only create tmux session if it doesn't already exist
if [ "$SESSIONEXISTS" = "" ]
then
    echo "Creating new tmux session $SESSIOn"
    # Start New Session with our name
    tmux new-session -d -s $SESSION
    
    # Create a Window for our Server Sessions, start the servers
    tmux rename-window -t $SESSION $SESSION_WINDOW_LOCAL_SERVERS
    tmux send-keys -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS "cd '$(PWD)'" C-m "clear" C-m
    
    tmux split-window -h -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS
    tmux send-keys -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS.1 "cd src/rims-frontend/" C-m "nvm use" C-m "npm run dev" C-m
    tmux send-keys -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS.2 "cd src/rims-api/" C-m "nvm use" C-m "func host start --verbose" C-m
    
    # Create a Window for Docker
    tmux new-window -t $SESSION -c "$(PWD)" -n $SESSION_WINDOW_DOCKER
    tmux send-keys -t $SESSION:$SESSION_WINDOW_DOCKER "docker-compose build" C-m "docker-compose up" C-m
    
    # Create a Window for zsh
    tmux new-window -t $SESSION -c "$(PWD)" -n $SESSION_WINDOW_SHELL
fi

# Attach Session, on the Main window
echo "Attaching to tmux session $SESSION"
sleep 5
tmux attach-session -t $SESSION
