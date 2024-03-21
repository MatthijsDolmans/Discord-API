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
        } else if (hours === 14 && minutes === 30) {
          this.sendMessage('Captain Hook is aandelen aan het handelen!');
        } else if (hours === 15 && minutes === 15) {
          this.sendMessage('Captain Hook verkoopt alle aandelen 15:30 dipje is voorbij!!');
        } else if (hours === 15 && minutes === 30) {
          this.sendMessage('Captain Hook ziet dat het nog maar anderhalf uur is!');
        }
        else if (hours === 15 && minutes === 52) {
          this.sendMessage('Captain Hook ziet dat het nog maar anderhalf uur is!');
        }
        else if (hours === 16 && minutes === 0) {
          this.sendMessage('Captain ziet dat het nog maar een uurtje is');
        } 
        else if (hours === 16 && minutes === 55) {
          this.sendMessage('Nog 5 minuten!!!');
        } else if (hours === 17 && minutes === 0) {
          this.sendMessage('Captain Hook gaat weer slapen!');
          
        } else {
          // Do nothing
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
  }
};
</script>

<style>
/* Your CSS styles here */
</style>
