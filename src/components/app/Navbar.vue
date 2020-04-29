<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ currentDate | date() }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a href="#"
            class="dropdown-trigger black-text"
            data-target="dropdown"
            ref="dropdownTrigger"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link :to="{ name: 'Profile' }" class="black-text">
                <i class="material-icons">account_circle</i>Профіль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Вийти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    currentDate: new Date(),
    dateInterval: null,
    dropdown: null,
  }),
  computed: {
    userName() {
      return this.$store.getters.user.info.name;
    },
  },
  mounted() {
    this.dateInterval = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdownTrigger);
  },
  beforeDestroy() {
    clearInterval(this.dateInterval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login?message=logout');
        });
    },
  },
};
</script>
