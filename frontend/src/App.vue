<template>
    <div id="app">
        <p v-if="mountedSuccessfully">Component mounted successfully!</p>
        <p>{{ message }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '',
                mountedSuccessfully: false
            };
        },
        mounted() {
            this.mountedSuccessfully = true;
            this.scheduleMessages();
        },
        methods: {
            scheduleMessages() {
                setInterval(() => {
                    const now = new Date();
                    const hours = now.getHours();
                    const minutes = now.getMinutes();

                    if (hours === 9 && minutes === 0) {
                        this.sendMessage('goede morgen, vandaag ga ik Captain Hook je weer laten weten wanneer er activiteiten zijn!');
                    } else if (hours === 12 && minutes === 30) {
                        this.sendMessage('Captain Hook gaat even wat eten!');
                    } else if (hours === 13 && minutes === 40) {
                        this.sendMessage('Captain Hook is nu al moe!');
                    } else if (hours === 13 && minutes === 50) {
                        this.sendMessage('Captain Hook ziet dat het nog niet eens 2 uur is!');
                    } else if (hours === 14 && minutes === 30) {
                        this.sendMessage('Captain Hook het is pas half 3 pffffffff!');
                    } else if (hours === 14 && minutes === 45) {
                        this.sendMessage('Captain Hook gaat Amit kijken!');
                    } else if (hours === 15 && minutes === 0) {
                        this.sendMessage('Captain Hook nog half uur tot marktje!');
                    } else if (hours === 15 && minutes === 30) {
                        this.sendMessage('Captain Hook ziet tesla moonen! MARKT IS OPEN!!!!!');
                    } else if (hours === 16 && minutes === 0) {
                        this.sendMessage('Captain ziet dat het nog maar een uurtje is');
                    } else if (hours === 16 && minutes === 55) {
                        this.sendMessage('Nog 5 minuten!!!');
                    } else if (hours === 17 && minutes === 0) {
                        this.sendMessage('Captain Hook gaat weer slapen!');
                    }
                }, 60000); // Check every minute
            },

            sendMessage(message) {
                const webhookUrl = 'https://discord.com/api/webhooks/1219667269186093188/kujZpvgBngWuEVo6-exEriPM9N_XIw8cSC9QbahAx6Iy1LEdfwx3FJpwRvHZfCmJZkG3'; // Replace with your Discord webhook URL

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
        } // Closing brace for methods object
    }
</script>
