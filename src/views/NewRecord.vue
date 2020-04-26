<template>
  <div>
    <div class="page-title">
      <h3>Новий запис</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <select>
          <option
          >name cat</option>
        </select>
        <label>Оберіть категорію</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
          />
          <span>Дохід</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
          />
          <span>Витрата</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
        >
        <label for="amount">Сума</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
        >
        <label for="description">Опис</label>
        <span
              class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Створити
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewRecord',
};
</script>
