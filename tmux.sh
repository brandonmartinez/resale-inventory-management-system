#!/bin/sh

# Set Session Name
SESSION="RIMS"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

# Only create tmux session if it doesn't already exist
if [ "$SESSIONEXISTS" = "" ]
then
    echo "Creating new tmux session $SESSIOn"
    # Start New Session with our name
    tmux new-session -d -s $SESSION
    
    # Create a Window for our Server Sessions, start the servers
    tmux rename-window -t $SESSION Servers
    tmux send-keys -t $SESSION:Servers "cd '$(PWD)'" C-m "clear" C-m
    
    tmux split-window -h -t $SESSION:Servers
    tmux send-keys -t $SESSION:Servers.1 "cd src/rims-frontend/" C-m "nvm use" C-m "npm run start" C-m
    tmux send-keys -t $SESSION:Servers.2 "cd src/rims-api/" C-m "func host start" C-m
    
    # Create a Window for zsh
    tmux new-window -c "$(PWD)" -n "zsh"
fi

# Attach Session, on the Main window
echo "Attaching to tmux session $SESSION"
sleep 5
tmux attach-session -t $SESSION
