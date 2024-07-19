<template>
  <div
    v-ui:animate.onenter="'fadeInUp faster delay-300ms'"
    :class="$style.modal"
  >
    <div v-if="getCartStatus === 'NETWORK_START'" :class="$style.loading">
      <EcomSpinner kind="bars" fg-color="#fafafa" />
    </div>
    <span :class="$style.modalTitle">
      <img
        src="~/assets/images/icon-close.svg"
        class="s-modal-close-x fixed-right"
        @click.self="$store.dispatch('modal/close')"
      >
      Your Cart
    </span>
    <header :class="$style.header">
      <span :class="$style.cartCount">
        <b>{{ getCartCount }} {{ getCartCount === 1 ? 'item' : 'items' }}</b>
        <EcomCartIcon :class="$style.cartIcon" />
      </span>
    </header>
    <div v-if="getCartNotices.length" :class="[$style.uiNoticesWrap]">
      <!-- eslint-disable vue/no-v-html  -->
      <div
        v-for="notice in getCartNotices"
        :key="notice.Id"
        v-dismissible
        :class="[$style.uiNotices, $style[notice.Type], 'u-display-hidden']"
        v-html="notice.Msg"
      />
    </div>
    <div
      v-if="getCartCount === 0 && getCartStatus !== 'NETWORK_START'"
      :class="$style.emptyCart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="96"
        height="96"
        viewBox="0 0 164 164"
      >
        <defs>
          <filter
            id="A"
            x="0"
            y="0"
            width="164"
            height="164"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="3" result="A" />
            <feFlood flood-opacity=".16" />
            <feComposite operator="in" in2="A" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g transform="translate(-414 -325)">
          <g transform="translate(414 325)" filter="url(#A)">
            <circle cx="82" cy="79" r="73" fill="#fff" />
          </g>
          <path
            d="M527.354 414.922l7.1-31.254c.243-1.07-.014-2.19-.698-3.05s-1.72-1.356-2.818-1.356h-59.016l-1.377-6.734c-.343-1.678-1.82-2.883-3.533-2.883h-15.406c-1.992 0-3.606 1.614-3.606 3.606v2.4c-.001.957.378 1.876 1.054 2.553s1.594 1.058 2.552 1.058h10.5l10.555 51.6c-3.136 1.8-4.773 5.4-4.066 8.945s3.6 6.243 7.186 6.7 7.064-1.426 8.64-4.68.897-7.15-1.686-9.68h31.5c-2.62 2.567-3.273 6.536-1.616 9.808s5.243 5.093 8.862 4.5 6.438-3.46 6.966-7.1-1.356-7.183-4.657-8.782l.83-3.648c.243-1.07-.014-2.19-.698-3.05s-1.72-1.356-2.818-1.356h-40.33l-.983-4.808h44.047c1.683 0 3.142-1.163 3.516-2.804z"
            opacity=".7"
          />
          <circle
            cx="524.5"
            cy="384.5"
            r="18.5"
            fill="var(--app-color-orange)"
          />
          <text
            fill="#fff"
            font-size="24"
            font-family="var(--app-font-bold)"
            font-weight="600"
          >
            <tspan x="517.025" y="392">0</tspan>
          </text>
        </g>
      </svg>
      <div :class="$style.emptyCartH1">
        Your shopping cart is empty
      </div>
      <div :class="$style.emptyCartH2">
        Please add something to your cart
      </div>
    </div>
    <ul v-if="getCart.length > 0" :class="$style.list">
      <li v-for="item in getCart" :key="item.Id">
        <div :class="$style.item">
          <div :class="$style.thumbnail">
            <img
              :src="$hopX.image(item.Thumbnail, { width: 150, height: 150 })"
              :class="$style.thumbnailImg"
            >
          </div>
          <div :class="$style.itemBody">
            <!-- eslint-disable vue/no-v-html  -->
            <div :class="$style.title" v-html="item.Title" />
            <div
              v-for="prices in item.DisplayPrices"
              :key="prices"
              :class="$style.pricing"
              v-html="prices"
            />
            <div :class="$style.cartItemActions">
              <select
                v-if="item.IsQtyEditable"
                :title="`Set your quantity for: '${item.Title}'.`"
                :value="item.Qty"
                name="qty"
                :class="[$style.selectQty, $style.selectDropdownStyled]"
                @change="$evt => update($evt, item)"
              >
                <option
                  v-for="qs in quatitySelect"
                  :key="item.Id + qs.name"
                  :value="qs.value"
                >
                  {{ qs.name }}
                </option>
              </select>
              <span
                v-else
                :class="$style.cartQtyLimited"
              >Limit 1 per customer</span>
              <div
                :title="`Delete '${item.Title}' from your cart.`"
                :class="$style.trashcanWrap"
                @click="confirmRemove(item)"
              >
                <EcomTrashcanIcon />
              </div>
            </div>
            <section v-if="hasDisclosure(item)">
              <Prop65 :msg="item.Prop65" />
            </section>
          </div>
        </div>
      </li>
    </ul>
    <div :class="$style.cta">
      <EcomHttpPost v-if="getCartCount > 0">
        <EcomButton
          no-ripple="no-ripple"
          :class="[$style.btn, $style.checkout]"
          @click="$hopX.AnalyticEvent('onCartCheckoutClicked')"
        >
          Checkout
        </EcomButton>
      </EcomHttpPost>
      <EcomButton
        :class="[$style.btn, $style.dark]"
        @click="$store.dispatch('modal/close')"
      >
        Continue Shopping
      </EcomButton>
    </div>
    <div
      v-if="refItem"
      :class="$style.confirmDeleteWrap"
      @click.self="cancelRemove"
    >
      <div
        v-ui:animate.onenter="'fadeInDown faster delay-300ms'"
        :class="[$style.confirmDelete, 'u-display-hidden']"
      >
        <div :class="$style.trashCanWrap">
          <EcomTrashcanIcon :class="$style.trashcanWhite" />
        </div>
        <span
          :class="$style.confirmDeleteText1"
        >Are You Sure You Want To Delete This Item?</span>
        <span :class="$style.confirmDeleteText2" v-html="productTitle" />
        <div :class="$style.confirmDeleteCta">
          <button @click="cancelRemove">
            Cancel
          </button>
          <button @click="remove">
            Yes, Delete It
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Prop65 from '~/components/General/Prop65.vue'

export default {
  name: 'EcomModalMiniCart',
  components: {
    Prop65
  },
  data () {
    return {
      refItem: null,
      productTitle: null
    }
  },
  computed: {
    ...mapGetters('cart', [
      'getCart',
      'getCartNotices',
      'getCartStatus',
      'getCartCount'
    ]),
    quatitySelect () {
      return [
        { name: '0 (Delete)', value: 0 },
        { name: 1, value: 1 },
        { name: 2, value: 2 },
        { name: 3, value: 3 }
      ]
    }
  },
  methods: {
    hasDisclosure (item) {
      return typeof item.Prop65 === 'string'
    },
    cancelRemove () {
      this.productTitle = null
      this.refItem = null
    },
    confirmRemove (item) {
      this.productTitle = item.Title
      this.refItem = item.Id
    },
    remove () {
      this.$store.dispatch('cart/remove', { Id: this.refItem }).then(() => {
        this.cancelRemove()
      })
    },
    update (evt, item) {
      const newQty = parseInt(evt.target.value)
      if (newQty === 0) {
        this.confirmRemove(item)
      } else {
        this.$store.dispatch('cart/update', { Id: item.Id, Qty: newQty })
      }
    }
  }
}
</script>

<style lang="scss" module>
.modal {
  background-color: rgb(26, 26, 26);
  border-radius: 1.7rem;
  color: #ffffff;
  width: calc(100% - 1.5rem);
  max-width: 62.755rem;
  min-height: 32rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: relative;
  @include sm {
    max-height: 75.111vh;
  }
  @include md {
    max-height: 82.111vh;
    min-height: 40vh;
  }
}

.modalTitle {
  color: var(--app-color-orange);
  position: relative;
  // padding: 0.75rem;
  // font-size: 2.8rem;
  padding: 1.875rem 0 1rem;
  // font-size: 1.337rem;
  font-size: 1.7007rem;
  text-align: center;
  &:after {
    content: '';
    background-color: rgba(255, 255, 255, 0.0911);
    position: absolute;
    width: 100%;
    left: 0;
    height: 2px;
    bottom: 0;
  }
}

.header {
  display: flex;
  align-items: flex-end;
  margin: 0 1.111rem 0;
  position: absolute;
  width: 100%;
  pointer-events: none;
  top: -2px;
  .cartCount {
    font-family: var(--app-font-normal);
    padding: 0.75rem;
    font-size: 1.6777rem;
    @include xs {
      font-size: 1.3777rem;
    }
  }
  .cartIcon {
    position: relative;
    width: 1.5rem;
    bottom: -8px;
    left: -2px;
  }
}

.uiNoticesWrap {
  @include sm {
    position: absolute;
    z-index: 3;
  }

  .uiNotices {
    font-family: var(--app-font-normal);
    font-size: 1.5rem;
    padding: 1rem 6rem 1rem 1rem;
    margin: 1.111rem;
    border-radius: 0.557rem;
    box-shadow: 0px 3px 2px 0px rgba(30, 30, 30, 0.865);
    background-color: rgb(191, 191, 191);
    color: rgb(41, 41, 41);
    position: relative;

    &.Success {
      background-color: rgb(189, 255, 182);
      color: rgb(59, 152, 78);
    }
    &.Warning {
      background-color: rgb(252, 248, 227);
      color: rgb(103, 103, 103);
    }
    &.Info {
      background-color: rgb(17, 62, 208);
      color: rgb(227, 227, 227);
    }
    &.Danger {
      background-color: rgb(193, 17, 17);
      color: rgb(255, 228, 228);
    }
    &:after {
      content: '\00d7';
      color: #ffffff;
      background-color: rgba(35, 35, 35, 0.4);
      padding: 0.25rem 0.4rem;
      font-size: 3.125rem;
      margin-left: 0.5rem;
      border-radius: 0.5rem;
      box-shadow: 0px 3px 2px 0px rgba(207, 207, 207, 0.25);
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 4.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.emptyCart {
  position: relative;
  text-align: center;
  font-size: 1rem;
  top: 1rem;
  .emptyCartH1 {
    font-family: var(--app-font-bold);
    font-size: 2rem;
    text-transform: uppercase;
  }
  .emptyCartH2 {
    font-family: var(--app-font-normal);
    font-size: 1.7rem;
  }
}

.loading {
  position: absolute;
  background: rgba(6, 6, 6, 0.877);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 1.7rem;
}

.list {
  list-style: none;
  padding: 0;
  max-height: 70vh;
  min-height: 17.117rem;
  padding-bottom: 1.111rem;
  overflow-y: scroll;
  position: relative;
  li:first-child {
    .item {
      margin-top: 2.111rem;
    }
  }
  li:last-child {
    .item {
      &:after {
        display: none;
      }
    }
  }
  .item {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 2rem;
    position: relative;
    padding: 0;
    margin: 4.111rem 1.111rem -0.411rem;
    &:after {
      content: '';
      background-color: rgba(255, 255, 255, 0.0911);
      width: calc(100% + 2rem);
      left: -1rem;
      position: absolute;
      height: 2px;
      bottom: -1.366rem;
    }
    .thumbnail {
      width: 8rem;
      margin-left: 0.777rem;
      .thumbnailImg {
        border-radius: 0.75rem;
        width: 7rem;
      }
    }
    @include md {
      .thumbnail {
        width: 15rem;
        .thumbnailImg {
          width: 13rem;
        }
      }
    }
    .itemBody {
      flex: 1 0 0;
      @include sm {
        max-width: 75%;
      }
      .title {
        font-family: var(--app-font-bold);
        font-size: 1.8rem;
        margin-bottom: 0.75rem;
      }
      .pricing {
        font-size: 1.5rem;
        line-height: 2.2rem;
      }
      .cartItemActions {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        flex-direction: row-reverse;
        align-items: center;
        padding: 1rem 0;
        .selectQty {
          font-family: var(--app-font-bold);
          cursor: pointer;
          width: 6.777rem;
        }
        .trashcanWrap {
          font-family: var(--app-font-bold);
          cursor: pointer;
          height: 4.5rem;
          width: 2.555rem;
          margin-right: 1.115rem;
        }
        .cartQtyLimited {
          font-size: 1.25rem;
          width: 17rem;
          line-height: 1.5rem;
          opacity: 0.75;
        }
      }
    }
  }
}

.cta {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  flex-direction: row-reverse;
  padding: 0 0 1.222rem;
  @include xs {
    flex-flow: column nowrap;
    padding: 1.222rem 0 1.577rem;
  }
  @include sm-only {
    flex-flow: column nowrap;
    padding: 1.222rem 0 1.577rem;
  }
  @include lg {
    flex-flow: column nowrap;
  }

  .btn {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 1rem 1rem 0;
    .ecomButtonStyle {
      background-color: var(--app-color-orange);
      font-family: var(--app-font-bold);
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
      text-transform: uppercase;
      border-radius: 0.766rem;
      color: #ffffff;
      font-size: 1.7rem;
      padding: 1rem;
      width: 100%;
    }
    &.checkout {
      .ecomButtonStyle {
        position: relative;
        max-width: calc(100% - 2rem);
        padding: 1.3rem 1rem;
        @include lg {
          padding: 2.3rem 1rem;
        }
        @include portrait {
          padding: 2.3rem 1rem;
        }
        &:after {
          content: url('~assets/images/icon-arrow-forward.svg');
          width: 3rem;
          position: absolute;
          right: 3rem;
          margin-top: -2px;
          @include ms-edge {
            display: none;
          }
        }
      }
    }
    &.dark {
      @include sm {
        min-height: 4.5rem;
        margin-bottom: 1.5rem;
      }
      .ecomButtonStyle {
        background-color: #1b1b1b;
        box-shadow: none;
        &:before {
          content: url('~assets/images/icon-arrow-back.svg');
          width: 3rem;
          position: relative;
          left: -1rem;
          top: 5px;
          @include ms-edge {
            display: none;
          }
        }
      }
    }
  }
}

/* styled select element */
.selectDropdownStyled {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid rgba(170, 170, 170, 0.17);
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  color: #ffffff;
  background-color: #3e3e3e;
  background-image: url('~assets/images/icon-select-arrow.svg'),
    linear-gradient(to bottom, #3e3e3e 0%, #101010 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  &::-ms-expand {
    display: none;
  }
  &:hover {
    color: #ffffff;
  }
  &:focus {
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #ffffff;
    outline: none;
  }
  option {
    font-weight: normal;
  }
}

/* confirmDelete */
.confirmDeleteWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.87);
  border-radius: 2rem;
  z-index: 1;

  .trashCanWrap {
    background-color: var(--app-color-orange);
    padding: 0.25rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    .trashcanWhite {
      fill: #ffffff;
      margin-right: -5px;
    }
  }

  .confirmDelete {
    background-color: #ffffff;
    color: #222222;
    width: 26rem;
    border-radius: 1rem;
    padding: 3rem 1rem 1rem;
    font-size: 1.675rem;
    position: relative;
    box-shadow: 0px 2px 1px rgba(34, 34, 34, 0.3);
    &:before {
      content: '';
      position: absolute;
      background-color: var(--app-color-orange);
      border-radius: 10px 10px 0px 0px;
      width: 100%;
      height: 1rem;
      top: 0;
      left: 0;
    }

    .confirmDeleteText1 {
      font-family: var(--app-font-bold);
      font-size: 1.4rem;
      display: block;
      text-align: center;
    }

    .confirmDeleteText2 {
      font-family: var(--app-font-normal);
      font-size: 1.25rem;
      display: block;
      text-align: center;
      margin-top: 1.5rem;
    }

    .confirmDeleteCta {
      display: flex;
      justify-content: space-around;
      margin-top: 2rem;

      button {
        font-family: var(--app-font-bold);
        box-shadow: 0px 2px 1px rgba(34, 34, 34, 0.15);
        border-radius: 0.5rem;
        cursor: pointer;
        flex: 45% 0 0;
        padding: 0.75rem 0;
        outline: none;
        border: none;
        &:first-of-type {
          background-color: #ededed;
          color: var(--app-color-orange);
        }
        &:last-of-type {
          background-color: var(--app-color-orange);
          color: #ffffff;
        }
      }
    }
  }
}
</style>
