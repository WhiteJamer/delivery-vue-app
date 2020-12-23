<template>
  <form class="form">
    <div class="form__row">
      <div class="form__col" v-for="place in marks" :key="place.id">
        <label class="form__input input input--radio">
          {{ place.address }}
          <input type="radio" :value="place.address" v-model="pickupPlace" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <div class="form__row">
      <div class="form__col">
        <yandex-map
          :zoom="zoom"
          :scroll-zoom="ymConfig['scroll-zoom']"
          :coords="coords"
          style="width: 100%; max-width: 100%; height: 65vh"
        >
          <ymap-marker
            v-for="(marker, index) in marks"
            :key="index"
            :marker-id="index"
            :coords="marker.coords.split(',')"
            :icon="markerIcon"
          />
        </yandex-map>
      </div>
    </div>
    <div class="form__footer">
      <div class="form__row">
        <div class="form__col">
          <button class="form__btn form__btn--submit" type="submit">
            Отправить
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  name: "FormPickup",
  components: { yandexMap, ymapMarker },
  mounted() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test()
    ) {
      this.ymConfig["scroll-zoom"] = false; // Отключаем зум на мобильных девайсах
    }
  },
  data() {
    return {
      pickupPlace: null,
      zoom: 5,
      coords: [55.5, 37],
      ymConfig: {
        "scroll-zoom": true,
      },
      marks: [
        {
          id: "1",
          address: "Пункт Выдачи заказов Песчаная улица, дом 13",
          coords: "55.801131, 37.508167",
        },
        {
          id: "2",
          address: "Пункт Выдачи заказов Подсосенский переулок, 11",
          coords: "55.757556, 37.651592",
        },
      ],
      selectedMarks: [],
      markerIcon: {
        layout: "default#imageWithContent",
        imageHref: "/geo.png",
        imageSize: [43, 43],
        imageOffset: [0, 0],
        contentOffset: [0, 15],
        contentLayout:
          "<div style=\"background: red; width: 50px; color: #FFFFFF; font-weight: bold;\">$[properties.iconContent]</div>",
      },
    };
  },
};
</script>

<style>
</style>