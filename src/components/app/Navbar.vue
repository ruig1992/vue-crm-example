<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ currentDate | date('datetime', currentLocale) }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a href="#"
            class="dropdown-trigger black-text"
            data-target="dropdown_locales"
            ref="dropdownLocalesTrigger"
          >
            {{ currentLocale | strCase }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown_locales" class="dropdown-content">
            <li v-for="(locale, i) in locales" :key="`Locale${i}`">
              <a class="black-text"
                :class="{ active: locale === $i18n.locale }"
                @click.prevent="setLocale(locale)"
              >
                {{ locale | strCase }}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#"
            class="dropdown-trigger black-text"
            data-target="dropdown"
            ref="dropdownTrigger"
          >
            {{ userName | strCase }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link :to="{ name: 'Profile' }" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ $t('app_navbar.profile') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{ $t('app_navbar.logout') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import config from '@/config/app.config';

export default {
  name: 'Navbar',
  data: () => ({
    currentDate: new Date(),
    dateInterval: null,
    dropdown: null,
    dropdownLocales: null,
    locales: config.locales,
  }),
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    userName() {
      return this.$store.getters.info.name;
    },
  },
  mounted() {
    this.dateInterval = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdownTrigger);
    this.dropdownLocales = window.M.Dropdown.init(this.$refs.dropdownLocalesTrigger);
  },
  beforeDestroy() {
    clearInterval(this.dateInterval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
    if (this.dropdownLocales && this.dropdownLocales.destroy) {
      this.dropdownLocales.destroy();
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
    async setLocale(locale) {
      await this.$store.dispatch('changeLocale', locale);
      this.$i18n.locale = locale;
    },
  },
};
</script>
