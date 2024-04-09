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

        if (hours === 14 && minutes === 18) {
          this.sendRandomFact();
        } else if (hours === 13 && minutes === 59) {
          this.sendMessage('goede morgen, vandaag ga ik Captain Hook je weer laten weten wanneer er activiteiten zijn!');
        } else if (hours === 12 && minutes === 30) {
          this.sendMessage('Captain Hook gaat even wat eten!');
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
    },
    async sendRandomFact() {
  const prompt = "Give me a random fact.";
  const apiKey = "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"; 

  const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50
    })
  });

  if (!response.ok) {
    console.error('Failed to fetch from OpenAI:', response.statusText);
    return;
  }

  const data = await response.json();
  const fact = data.choices[0].text.trim();

  this.sendMessage(`Random Fact: ${fact}`);
}
  }
};
</script>
