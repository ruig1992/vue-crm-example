export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      perPageCount: 5,
      pageCount: 0,
      allItems: [],
      // items: [],
    };
  },
  computed: {
    items() {
      return this.allItems[this.page - 1] || this.allItems[0];
    },
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = this.chunk(allItems);
      this.pageCount = this.allItems.length;
      // this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    onPageChanged(page) {
      const queryStr = page > 1 ? `?page=${page}` : '';
      this.$router.push(`${this.$route.path}${queryStr}`);
    },
    chunk(allItems) {
      const chunks = [];
      for (let i = 0; i < allItems.length; i += this.perPageCount) {
        chunks.push(allItems.slice(i, i + this.perPageCount));
      }
      return chunks;
    },
  },
};
