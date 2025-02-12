<template>
    <div>
      <h2>Notificações</h2>
      <ul>
        <li v-for="notification in notifications" :key="notification.id">
          {{ notification.data.message }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [],
      };
    },
    created() {
      axios.get("/api/notifications").then((response) => {
        this.notifications = response.data;
      });
    },
  };
  </script>
  