<template>
  <div class="app-main-layout">
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">12.12.12</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a class="dropdown-trigger black-text" href="#" data-target="dropdown">
              USER NAME
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
                <a href="#" class="black-text">
                  <i class="material-icons">assignment_return</i>Вийти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav app-sidenav open">
      <li>
        <router-link :to="{ name: 'Home' }"
          class="waves-effect waves-orange pointer"
          exact
        >Рахунок</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'History' }"
          class="waves-effect waves-orange pointer"
          exact
        >Історія</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Planning' }"
          class="waves-effect waves-orange pointer"
          exact
        >Планування</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'NewRecord' }"
          class="waves-effect waves-orange pointer"
          exact
        >Новий запис</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Categories' }"
          class="waves-effect waves-orange pointer"
          exact
        >Категорії</router-link>
      </li>
    </ul>

    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link :to="{ name: 'NewRecord' }"
        class="btn-floating btn-large blue"
      ><i class="large material-icons">add</i></router-link>
    </div>
  </div>
</template>
