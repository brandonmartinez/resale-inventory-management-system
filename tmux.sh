#!/usr/bin/env bash

# Set Session Name
SESSION="RIMS"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

SESSION_WINDOW_LOCAL_SERVERS="dev"
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
    tmux split-window -h -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS
    tmux select-layout -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS even-horizontal
    
    tmux send-keys -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS.1 "docker-compose build rims-frontend" C-m "docker-compose up --no-log-prefix rims-frontend" C-m
    tmux send-keys -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS.2 "docker-compose build rims-api" C-m "docker-compose up --no-log-prefix rims-api" C-m
    tmux send-keys -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS.3 "docker-compose up --no-log-prefix rims-ingress" C-m
    
    # Create a Window for zsh
    tmux new-window -t $SESSION -c "$(PWD)" -n $SESSION_WINDOW_SHELL
    
    tmux select-window -t $SESSION:$SESSION_WINDOW_LOCAL_SERVERS
fi

# Attach Session, on the Main window
echo "Attaching to tmux session $SESSION"
sleep 5
tmux attach-session -t $SESSION
