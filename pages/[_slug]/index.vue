<template>
  <div>
    <ContentFrame
      :description="voie.description"
      :image-url="voie.cover"
    >
      <template #header>
        <h1 class="text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {{ getRevName('singular') }}
          <div
            class="mt-2 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold mx-auto"
            :style="`background-color: ${getLineColor(voie.line)}`"
          >
            {{ voie.line }}
          </div>
        </h1>
      </template>
      <h2>Aperçu</h2>
      <Overview :voie="voie" />
      <ContentRenderer :value="voie" />
    </ContentFrame>

    <LvvCta class="pb-10" />
  </div>
</template>

<script setup>
const { path } = useRoute();
const { getLineColor } = useColors();
const { getRevName } = useConfig();
const { getVoieCyclableRegex } = useUrl();

const regex = getVoieCyclableRegex();
const line = path.match(regex)[1];

// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  middleware: 'voie-cyclable'
});

const { data: voie } = await useAsyncData(`${path}`, () => {
  return queryContent('voies-cyclables').where({ _type: 'markdown', line: String(line) }).findOne();
});

const description = `Tout savoir sur la ${getRevName('singular')} ${voie.value.line}. Avancement, carte interactive, détail rue par rue, calendrier des travaux et photos du projet.`;
const coverImage = voie.value.cover;
useHead({
  title: `${getRevName('singular')} ${voie.value.line}`,
  meta: [
    // description
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    // cover image
    { hid: 'og:image', property: 'og:image', content: coverImage },
    { hid: 'twitter:image', name: 'twitter:image', content: coverImage }
  ]
});
</script>
