<template>
  <form class="form">
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
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import ErrorHelper from "@/components/ErrorHelper";

export default {
  name: "FormDelivery",
  mixins: [validationMixin],
  data() {
    return {
      fio: null,
      phone: null,
      address: null,
      comment: null,
    };
  },
  components: { ErrorHelper },
  validations: {
    fio: {
      required,
      symbols: function () {
        if (this.fio) {
          return this.fio.length && /^[А-ЯЁ\s-]+$/iu.test(this.fio);
        } else {
          return true;
        }
      },
    },
    phone: { required },
    address: { required },
    comment: { required },
  },
};
</script>

<style>
</style>