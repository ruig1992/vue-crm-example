<template>
  <div>
    <div class="page-title">
      <h3>Категорії</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <CategoryCreate />
        </div>
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Редагувати</h4>
            </div>

            <form>
              <div class="input-field">
                <select>
                  <option>Category</option>
                </select>
                <label>Виберіть категорію</label>
              </div>

              <div class="input-field">
                <input type="text" id="name">
                <label for="name">Назва</label>
                <span class="helper-text invalid">TITLE</span>
              </div>

              <div class="input-field">
                <input
                    id="limit"
                    type="number"
                >
                <label for="limit">Ліміт</label>
                <span class="helper-text invalid">LIMIT</span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Оновити
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/Category/CategoryCreate.vue';

export default {
  name: 'Categories',
  components: { CategoryCreate },
};
</script>
