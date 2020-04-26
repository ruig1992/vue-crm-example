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

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <a href="#" class="black-text">
                  <i class="material-icons">account_circle</i>Профіль
                </a>
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
        <a href="#" class="waves-effect waves-orange pointer">Історія</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-orange pointer">Планування</a>
      </li>
      <li>
        <a href="#" class="waves-effect waves-orange pointer">Новий запис</a>
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
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>
