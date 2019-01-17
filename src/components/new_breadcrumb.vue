<template>
  <div>
    <v-breadcrumbs :items="breadcrumbItems" divider=">" style="padding: 0px; padding-left: 10px;"></v-breadcrumbs>
  </div>
</template>

<script>
    export default {
        name: "new_breadcrumb",
        props:["breadcrumbItems"],
    }
</script>

<style scoped>

</style>
