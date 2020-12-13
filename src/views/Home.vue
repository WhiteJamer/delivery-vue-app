<template>
  <div class="home">
    <div class="container">
      <h1 class="page-title">Выберите способ доставки</h1>
      <nav class="tabs" :class="{ 'tabs--open': tabsIsOpen }">
        <a
          href="#"
          class="tabs__item tabs__item--activator"
          @click="currentTab = 'Доставка'"
          >{{ currentTab }}
          <svg
            @click="tabsIsOpen = !tabsIsOpen"
            class="tabs__shevrone tabs__shevrone"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="284.929px"
            height="284.929px"
            viewBox="0 0 284.929 284.929"
            style="enable-background: new 0 0 284.929 284.929"
            xml:space="preserve"
          >
            <g>
              <path
                d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
              />
            </g></svg
        ></a>
        <div class="tabs__items">
          <a
            href="#"
            class="tabs__item"
            @click="currentTab = 'Доставка'"
            :class="{ 'tabs__item--active': currentTab == 'Доставка' }"
            >Доставка</a
          >
          <a
            href="#"
            class="tabs__item"
            @click="currentTab = 'Самовывоз'"
            :class="{ 'tabs__item--active': currentTab == 'Самовывоз' }"
            >Самовывоз</a
          >
        </div>
      </nav>
      <div class="tab-content">
        <form class="form" v-if="currentTab == 'Доставка'">
          <div class="form__row">
            <div class="form__col">
              <div class="form___input input">
                <label class="input__label" for="fio">ФИО</label>
                <input
                  required
                  v-model="fio"
                  class="input__field"
                  :class="{ 'input__field--invalid': $v.fio.$invalid }"
                  type="text"
                  id="fio"
                  name="fio"
                  placeholder="Только кириллица"
                />
                <error-helper v-if="!$v.fio.required">
                  Это обязательное поле
                </error-helper>
                <error-helper v-if="!$v.fio.symbols">
                  Недопустимые символы. Допустима киррилица, пробел и тире(-)
                </error-helper>
              </div>
            </div>
            <div class="form__col">
              <div class="form___input input">
                <label for="phone" class="input__label">Телефон</label>
                <input
                  required
                  v-model="phone"
                  v-maska="'+7 (###) ###-##-##'"
                  class="input__field"
                  :class="{ 'input__field--invalid': $v.phone.$invalid }"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                />
                <error-helper v-if="!$v.phone.required">
                  Это обязательное поле
                </error-helper>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <div class="form___input input">
                <label class="input__label" for="address">Адрес доставки</label>
                <input
                  required
                  v-model="address"
                  class="input__field"
                  :class="{ 'input__field--invalid': $v.address.$invalid }"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Город, улица, дом"
                />
                <error-helper v-if="!$v.address.required">
                  Это обязательное поле
                </error-helper>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="form__col">
              <div class="form___input input">
                <label class="input__label" for="comment">Комментарий</label>
                <textarea
                  required
                  v-model="comment"
                  class="input__field input__field--textarea"
                  :class="{ 'input__field--invalid': $v.comment.$invalid }"
                  id="comment"
                  name="comment"
                  rows="6"
                />
                <error-helper v-if="!$v.comment.required">
                  Это обязательное поле
                </error-helper>
              </div>
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
        <!-- Самовывоз -->
        <form
          class="form"
          @click="currentTab = 'Самовывоз'"
          v-if="currentTab == 'Самовывоз'"
        >
          <div class="form__row">
            <div class="form__col" v-for="place in marks" :key="place.id">
              <label class="form__input input input--radio">
                {{ place.address }}
                <input
                  type="radio"
                  :value="place.address"
                  v-model="pickupPlace"
                />
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
      </div>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ErrorHelper from '@/components/ErrorHelper'

export default {
  name: 'Home',
  components: { yandexMap, ymapMarker, ErrorHelper },
  mixins: [validationMixin],
  validations: {
    fio: {
      required,
      symbols: function () {
        if (this.fio) {
          return this.fio.length && /^[А-ЯЁ\s-]+$/iu.test(this.fio)
        } else {
          return true
        }
      },
    },
    phone: { required },
    address: { required },
    comment: { required },
  },
  mounted() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test()
    ) {
      this.ymConfig['scroll-zoom'] = false // Отключаем зум на мобильных девайсах
    }
  },
  data() {
    return {
      tabsIsOpen: false,
      fio: null,
      phone: null,
      address: null,
      comment: null,
      currentTab: 'Доставка',
      pickupPlace: null,
      zoom: 5,
      coords: [55.5, 37],
      ymConfig: {
        'scroll-zoom': true,
      },
      marks: [
        {
          id: '1',
          address: 'Пункт Выдачи заказов Песчаная улица, дом 13',
          coords: '55.801131, 37.508167',
        },
        {
          id: '2',
          address: 'Пункт Выдачи заказов Подсосенский переулок, 11',
          coords: '55.757556, 37.651592',
        },
      ],
      selectedMarks: [],
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: '/geo.png',
        imageSize: [43, 43],
        imageOffset: [0, 0],
        contentOffset: [0, 15],
        contentLayout:
          '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
      },
    }
  },
}
</script>
