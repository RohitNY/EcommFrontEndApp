window.Spectrum = {
  BootstrapUri: 'AutoShopExpContentDeviceClone10/Mershopexp',
  CartId: '',
  Analytics: {
    Events: {
      ApiRequestHardFailure: {
        event: 'on_api_hard_failure_redirect',
        msg: 'App has hard failure and user is being redirected based on rules set in Spectrum.RedirectError',
        $include: ['http_request_url', 'http_request_method', 'http_request_headers', 'http_response_status', 'http_response_status_text', 'http_response_headers', 'http_response_body']
      },
      PageInitialLoad: {
        event: 'on_page_load',
        msg: 'App has initial load - this will only fires once per app load',
        $data: ['Spectrum.Bootstrap.AnalyticsData']
      },
      PageTabChange: {
        event: 'on_tab_opened',
        msg: 'A tab was opened (e.g. First tab load, Continue button, Category tile on device, Header nav tab)',
        $data: ['Spectrum.Bootstrap.PathExperiences[n].AnalyticsData']
      },
      TabDevicesVisible: {
        event: 'on_tab_devices_visible',
        msg: 'Tab level devices presented to the user',
        $data: ['Page.Devices[n].AnalyticsData']
      },
      TabItemsLoaded: {
        event: 'on_tab_items_loaded',
        msg: 'All tab/page item(s) returned from API',
        $data: ['Page.AnalyticsData', 'Aggregate<Page.Items[n].AnalyticsData>']
      },
      TabItemsLoadedAttempted: {
        event: 'on_tab_items_loaded_attempted',
        msg: 'Tab /pages/<page> API failed to respond',
        $data: ['Item.AnalyticsData']
      },
      TabItemEnteredView: {
        event: 'on_tab_item_visible',
        msg: 'A item [device|adunit] has entered the viewport',
        $data: ['Page.Items[n].AnalyticsData']
      },
      SmltButtonClick: {
        event: 'on_smlt_button_click',
        msg: 'User clicked SEE MORE ITEMS LIKE THIS',
        $data: ['Page.Items[n].AnalyticsData']
      },
      SmltItemsLoaded: {
        event: 'on_smlt_items_loaded',
        msg: 'All SMLT item(s) returned from API',
        $data: ['Item.AnalyticsData', 'Similar.AnalyticsData', 'Aggregate<Similar.Items[n].AnalyticsData>']
      },
      SmltItemsLoadedAttempted: {
        event: 'on_smlt_items_loaded_attempted',
        msg: 'SMLT item(s) API failed to respond',
        $data: ['Item.AnalyticsData']
      },
      MoreInfoClick: {
        event: 'on_moreinfo_click',
        msg: 'User clicked on MORE INFO to expand an ad-unit',
        $data: ['Page.Items[n].AnalyticsData']
      },
      ImageClick: {
        event: 'on_image_click',
        msg: 'User clicked on the main image to show the image gallery lightbox on adunit or super feature',
        $data: ['Page.Items[n].AnalyticsData']
      },
      CartItemAdd: {
        event: 'on_cart_item_add',
        msg: 'A product was added to cart successfully',
        $data: ['Cart.Items[n].AnalyticsData']
      },
      CartItemAddAttempted: {
        event: 'on_cart_item_add_attempted',
        msg: 'A product was attempted to be added to cart but API failed',
        $include: ['quantity', 'offer_code'],
        $data: ['Page.Items[n].AnalyticsData']
      },
      CartItemRemove: {
        event: 'on_cart_item_remove',
        msg: 'A product was removed from cart successfully',
        $data: ['Cart.Items[n].AnalyticsData']
      },
      CartItemRemoveAttempted: {
        event: 'on_cart_item_remove_attempted',
        msg: 'A product was attempted to be removed from cart but API failed',
        $data: ['Cart.Items[n].AnalyticsData']
      },
      CartItemUpdate: {
        event: 'on_cart_item_update',
        msg: 'A product was updated in cart successfully',
        $data: ['Cart.Items[n].AnalyticsData']
      },
      CartItemUpdateAttempted: {
        event: 'on_cart_item_update_attempted',
        msg: 'A product was attempted to be updated in cart but API failed',
        $data: ['Cart.Items[n].AnalyticsData']
      },
      CartOpenOnHeaderClick: {
        event: 'on_cart_modal_opened_via_header',
        msg: 'User opened the Cart from app header icon',
        $data: ['Cart.AnalyticsData']
      },
      CartOpenOnOptionSelectClick: {
        event: 'on_cart_modal_opened_via_select_offer_modal',
        msg: 'User opened the Cart from a options select modal',
        $include: ['offer_type'],
        $data: ['Cart.AnalyticsData']
      },
      CartCheckout: {
        event: 'on_cart_checkout',
        msg: 'User clicked on the checkout button in cart',
        $data: ['Cart.AnalyticsData']
      },
      AffiliateProductClick: {
        event: 'on_affiliate_product_click',
        msg: 'User clicked on an affilate product.',
        $data: ['Item.AnalyticsData']
      }
    }
  },
  DisplayAds: {
    Subscribed: false,
    EventsEmitted: []
  },
  ReferrerUrl: 'http://spectrum.local.qa.pch.com/Path/AutoShopExpContentDeviceClone10/Mershopexp.aspx',
  Env: {
    ApiBaseUrl: 'http://spectrum.local.qa.pch.com/api/'
  },
  UiImages: {
    PW1: {
      AssetUrl: 'http://media.qa.pchassets.com/SpectrumMedia/images/warning_1.png',
      Alt: '',
      Label: ''
    },
    PW6: {
      AssetUrl: 'http://media.qa.pchassets.com/SpectrumMedia/images/warning_6.png',
      Alt: '',
      Label: ''
    }
  },
  UiComponentData: {
    Pricing: {
      Ui1: {
        Component: 'MerchandiseUi1',
        Labels: ['', '', 'PCH Price']
      },
      Ui2: {
        Component: 'MerchandiseUi1',
        Labels: ['', 'Regular PCH Price', 'Now Only']
      },
      Ui50: {
        Component: 'MagazineUi1',
        Labels: ['Issues', '', '', '', 'PCH Price']
      },
      Ui51: {
        Component: 'MagazineUi1',
        Labels: ['Issues', '', '', 'Cover Price', 'PCH Price']
      },
      Ui52: {
        Component: 'MagazineUi1',
        Labels: ['Issues', '', 'Cover Price', 'PCH Price', 'Now Only']
      },
      Ui60: {
        Component: 'MerchandiseUi1',
        Labels: ['', 'Regular PCH Price', 'Now Only']
      },
      Ui11526306: {
        Component: 'MerchandiseUi1',
        Labels: ['', 'Fusion Label', 'Now Only']
      },
      Ui11526314: {
        Component: 'MerchandiseUi1',
        Labels: ['', '', 'PCH Price']
      }
    },
    PageNavigation: {
      Ui1: {
        Component: 'ContinueUi1',
        Labels: ['CONTINUE']
      },
      Ui2: {
        Component: 'ContinueUi1',
        Labels: ['CONTINUE SHOPPING']
      },
      Ui3: {
        Component: 'ContinueUi2',
        Labels: ['CONTINUE SHOPPING', 'ENTER NOW']
      },
      UiContinueButton: {
        Component: 'ContinueUi',
        Labels: ['CONTINUE']
      },
      UiContinueShoppingButton: {
        Component: 'ContinueUi',
        Labels: ['CONTINUE SHOPPING']
      },
      UiSubmitButton: {
        Component: 'SubmitUi',
        EmptyCart: 'ENTER NOW',
        Cart: 'CHECKOUT NOW'
      }
    },
    AdUnit: {
      Ui6: {
        Component: 'TabMicrositeAdunit'
      },
      Ui5: {
        Component: 'MarketplaceMagazineAdunit'
      },
      Ui4: {
        Component: 'MarketplaceMerchandiseAdunit'
      },
      Ui3: {
        Component: 'EcomSuperfeatureAdunit'
      },
      Ui2: {
        Component: 'EcomMagazineAdunit'
      },
      Ui1: {
        Component: 'EcomMerchandiseAdunit'
      }
    }
  },
  LegalDisclosures: [{
    Id: 1491865,
    Title: 'Official Rules, Sweepstakes Facts & Privacy Policy',
    Body: "<div class=\"disclaimer\">\r\n <span id=\"PchLegalStaticDisclosure\">\r\n <p>Your Merchandise order should arrive in about 2 to 4 weeks.<br>For information relating to timing and delivery of Magazines <a href=\"//pch.custhelp.com/app/answers/detail/a_id/134\" target=\"_blank\">click here</a>.</p>\r\n <p>All savings on Magazines are off cover price, except where otherwise stated.</p>\r\n <p>Free gifts with magazine subscriptions are supplied by the magazine publishers. They are not available in stores. No maximum retail value established.</p>\r\n <p>Publishers Clearing House reserves the right to reject any order. All orders are subject to meeting our acceptance criteria which may include obtaining information from one or more consumer credit reporting agencies.</p>\r\n <p>This promotion is intended for users who have agreed to receive promotions from Publishers Clearing House by email. By submitting this page you are affirming your agreement to receive email from Publishers Clearing House and agreeing to PCH's <a href=\"//privacy.pch.com\" target=\"_blank\">privacy policy</a>.</p>\r\n <p><b>Please Note: We can only accept entry &amp; orders from the United States and Puerto Rico.</b></p>\r\n <p>Extra Savings, if applicable, represents either an additional comparison to the price of the same or a similar item offered by us or others to the public, or an additional reduction in our regular price for the item.</p> \r\n <p>For more information on our price comparisons, and an explanation of some of the abbreviations used in this promotion, please visit <a href=\"//www.pch.com/prices\" target=\"_blank\">www.pch.com/prices</a>.</p> \r\n </span>\r\n <a id=\"PchLegalOfficialRules\" target=\"_blank\" href=\"//rules.pch.com/viewrulesfacts?mailid=%mailid%\">Official Rules</a>\r\n <a id=\"PchLegalSweepstakesFacts\" target=\"_blank\" href=\"//rules.pch.com/viewrulesfacts?mailid=%mailid%#facts\">Sweepstakes Facts</a>\r\n <a id=\"PchLegalPrivacyPolicy\" target=\"_blank\" href=\"//privacy.pch.com\" rel=\"noreferrer noopener\">Privacy Policy</a>\r\n </div>"
  }, {
    Id: 1491866,
    Title: 'Standard Shipping Footer',
    Body: "<p class=\"disclaimer\">* Your order should arrive in about 4 to 6 weeks. For details on applicable sales tax, shipping and handling and other charges <a href=\"javascript:open('http://www.pch.com/shipping-handling-tax-2012-v2.html','450px','400px')\">click here</a>. Publishers Clearing House reserves the right to reject any order. All orders are subject to meeting our acceptance criteria which may include obtaining information from one or more consumer credit reporting agencies. **PLEASE NOTE: We can only accept entry &amp; orders from the United States, Puerto Rico and APO/FPO. For all Horticulture items, there will be no shipping to Puerto Rico, Alaska, Hawaii or APO/FPO addresses. Horticultural goods will be shipped at the appropriate time for planting in your area. Photos for illustrative purposes only.</p>"
  }],
  FooterLinks: {
    DoNotSell: 'https://accounts.pch.com/do-not-sell',
    TermsOfUse: 'http://privacy.pch.com/pchdotcom-tou',
    AdPrefs: 'http://preferences-mgr.trustarc.com/?pid=pch01&aid=pch_pub01&type=pch'
  },
  HeaderLinks: {
    Theme: 'black-friday',
    Links: [{
      LinkText: 'Privacy Policy',
      LinkUrl: 'https://privacy.pch.com/',
      Target: '_blank'
    }, {
      LinkText: 'Official Rules',
      LinkUrl: 'https://rules.pch.com/viewrulesfacts?mailid=AutoShopExpContentDeviceClone10',
      Target: '_blank'
    }, {
      LinkText: 'Sweepstakes Facts',
      LinkUrl: 'https://rules.pch.com/viewrulesfacts?mailid=AutoShopExpContentDeviceClone10#facts',
      Target: '_blank'
    }]
  },
  RedirectError: {
    432: '//spectrum.qa.pch.com/Path/AutoShopExpContentDeviceClone10/Start.aspx',
    500: '//spectrum.qa.pch.com/Error/ServerError.aspx'
  },
  ThemeConfig: {
    'black-friday': {
      BaseUrl: 'http://media.qa.pchassets.com/SpectrumMedia/PresentationPackage/7112/2/BlackFriday/'
    }
  }
}
