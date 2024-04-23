<template>
    <div id="app">
        <p v-if="mountedSuccessfully">Component mounted successfully!</p>
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import { Client } from 'discord.js';

    export default {
        data() {
            return {
                message: '',
                mountedSuccessfully: false,
                players: [],
                gameInProgress: false,
                client: new Client(),
                token: process.env.BOT_TOKEN 
            };
        },
        mounted() {
            this.mountedSuccessfully = true;
            this.client.login(this.token);

            this.scheduleMessages();
            this.setupEventListeners();
        },
        methods: {
            setupEventListeners() {
                this.client.on('message', message => {
                    if (message.content.startsWith('!rps')) {
                        this.startGame();
                    }
                });
            },

            scheduleMessages() {
                setInterval(() => {
                    const now = new Date();
                    const hours = now.getHours();
                    const minutes = now.getMinutes();

                    if (hours === 15 && minutes === 49 && !this.gameInProgress) {
                        this.startGame();
                    }
                }, 60000); // Check every minute
            },

            startGame() {
                this.gameInProgress = true;
                const message = 'A rock-paper-scissors game is starting at 15:49! Type !rps [rock/paper/scissors] to join.';
                this.sendMessage(message);
            },

            playRPS(user, choice) {
                if (!this.gameInProgress) {
                    this.sendMessage('There is no game currently in progress.');
                    return;
                }

                if (this.players.length >= 2) {
                    this.sendMessage('The game is already full.');
                    return;
                }

                // Add the player and their choice
                this.players.push({ user, choice });

                if (this.players.length === 2) {
                    // Determine the winner
                    const p1Choice = this.players[0].choice.toLowerCase();
                    const p2Choice = this.players[1].choice.toLowerCase();

                    let winner = '';
                    if (p1Choice === p2Choice) {
                        winner = 'It\'s a tie!';
                    } else if (
                        (p1Choice === 'rock' && p2Choice === 'scissors') ||
                        (p1Choice === 'paper' && p2Choice === 'rock') ||
                        (p1Choice === 'scissors' && p2Choice === 'paper')
                    ) {
                        winner = this.players[0].user;
                    } else {
                        winner = this.players[1].user;
                    }

                    // Announce the winner
                    this.sendMessage(`The winner is ${winner}!`);
                    // Reset the game state
                    this.players = [];
                    this.gameInProgress = false;
                }
            },

            sendMessage(message) {
                const webhookUrl = 'https://discord.com/api/webhooks/1219667269186093188/kujZpvgBngWuEVo6-exEriPM9N_XIw8cSC9QbahAx6Iy1LEdfwx3FJpwRvHZfCmJZkG3'; // Replace this with your actual Discord webhook URL

                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: message })
                })
                    .then(response => {
                        if (!response.ok) {
                            console.error('Failed to send message');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    };
</script>
