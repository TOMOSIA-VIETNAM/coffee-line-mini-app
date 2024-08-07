<template>
  <div class="container text-center py-5" id="tempt">
    <div class="mx-auto">
      <svg id="svg"
          class="bi bi-check-circle-fill text-success mb-4"
          width="5em"
          height="5em"
          fill="currentColor"
          viewBox="0 0 16 16"
      >
        <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07-.02l3.992-4.99a.75.75 0 1 0-1.14-.976l-3.466 4.33-1.639-1.637a.75.75 0 0 0-1.06 1.06l2.25 2.25z" />
      </svg>
      <h1 class="display-4 mb-5">Thank You!</h1>
      <p class="lead">Your order has been placed successfully.</p>
      <p class="mt-4 mb-4">Please check your phone to track the order.</p>
      <hr class="my-4">
      <p class="mt-4 mb-4">Wish you a wonderful experience.</p>
      <a class="btn btn-primary btn-lg" href="/" role="button">Back to Home</a>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
}

@media (max-width: 576px) {
  .container {
    padding: 0 10px;
  }
}

#svg{
  display: inline !important;
}
#tempt{
  margin-top: 100px;
}
</style>
