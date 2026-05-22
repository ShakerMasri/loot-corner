export type Language = "en" | "ar";

export type LegalPageKey =
  | "terms"
  | "privacy"
  | "shipping"
  | "returns"
  | "contact";

export type DeliveryAreaTranslationKey =
  | "nablus_receive_point"
  | "west_bank_cities"
  | "jerusalem"
  | "lands_48"
  | "west_jerusalem_area";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  links?: {
    href: string;
    label: string;
  }[];
};

export type TranslationDictionary = {
  brand: {
    name: string;
  };
  nav: {
    home: string;
    products: string;
    cart: string;
    orders: string;
    account: string;
  };
  actions: {
    switchToArabic: string;
    switchToEnglish: string;
    lightMode: string;
    darkMode: string;
    browseProducts: string;
    viewCart: string;
    backToProducts: string;
    clearFilters: string;
  };
  footer: {
    rights: string;
    description: string;
  };
  home: {
    badge: string;
    titleStart: string;
    titleBrand: string;
    description: string;
    flowTitle: string;
    highlights: {
      title: string;
      description: string;
    }[];
    stats: {
      title: string;
      description: string;
    }[];
  };
  products: {
    badge: string;
    title: string;
    description: string;
    searchLabel: string;
    searchPlaceholder: string;
    allProducts: string;
    selectedCategory: string;
    showing: string;
    productSingular: string;
    productPlural: string;
    noProductsTitle: string;
    noProductsDescription: string;
    failedToLoad: string;
    failedToConnect: string;
    noImage: string;
    featured: string;
    soldOut: string;
    out: string;
    left: string;
    inStock: string;
    outOfStock: string;
    descriptionTitle: string;
    noDescription: string;
    payment: string;
    cashOnDelivery: string;
    category: string;
    productId: string;
    stockNote: string;
    productNotFound: string;
    productUnavailable: string;
    image: string;
    of: string;
  };
  cart: {
    badge: string;
    title: string;
    description: string;
    itemSingular: string;
    itemPlural: string;
    cartUnavailable: string;
    tryAgain: string;
    emptyTitle: string;
    emptyDescription: string;
    orderPlacedTitle: string;
    orderPlacedDescription: string;
    orderId: string;
    total: string;
    payment: string;
    status: string;
    viewOrders: string;
    continueShopping: string;
    unavailableNotice: string;
    each: string;
    subtotal: string;
    remove: string;
    removing: string;
    noImage: string;
    productArchived: string;
    productOutOfStock: string;
    onlyLeft: string;
    orderSummary: string;
    items: string;
    paymentMethod: string;
    estimatedTotal: string;
    cashOnDelivery: string;
    placeOrder: string;
    placingOrder: string;
    orderPlacedButton: string;
    stockServerNote: string;
    failedToLoad: string;
    failedToConnect: string;
    failedToUpdate: string;
    failedToRemove: string;
    failedToPlaceOrder: string;
    decreaseQuantity: string;
    increaseQuantity: string;
    deliveryDetailsTitle: string;
    deliveryDetailsDescription: string;
    deliveryArea: string;
    deliveryCity: string;
    deliveryCityPlaceholder: string;
    deliveryAddress: string;
    deliveryAddressOptional: string;
    deliveryAddressPlaceholder: string;
    deliveryNotes: string;
    deliveryNotesPlaceholder: string;
    productsTotal: string;
    deliveryPrice: string;
    finalTotal: string;
    reviewOrder: string;
    confirmOrderTitle: string;
    confirmOrderDescription: string;
    contactInfo: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    savedAccountContact: string;
    cancel: string;
    confirmPlaceOrder: string;
    deliveryCityRequired: string;
    deliveryAddressRequired: string;
    pickupAgreementRequired: string;
  };
  delivery: {
    currency: string;
    free: string;
    areas: Record<
      DeliveryAreaTranslationKey,
      {
        label: string;
        note?: string;
        agreementLabel?: string;
      }
    >;
  };
  orders: {
    badge: string;
    title: string;
    description: string;
    totalOrders: string;
    activeOrders: string;
    totalSpent: string;
    ordersUnavailable: string;
    tryAgain: string;
    noOrdersTitle: string;
    noOrdersDescription: string;
    browseProducts: string;
    refresh: string;
    order: string;
    placed: string;
    total: string;
    payment: string;
    items: string;
    quantity: string;
    subtotal: string;
    noImage: string;
    deliveryDetails: string;
    deliveryArea: string;
    deliveryCity: string;
    deliveryAddress: string;
    deliveryNotes: string;
    deliveryPrice: string;
    pickupAgreement: string;
    yes: string;
    notProvided: string;
    notRequired: string;
    failedToLoad: string;
    failedToConnect: string;
    statuses: Record<string, string>;
    paymentMethods: Record<string, string>;
    paymentStatuses: Record<string, string>;
  };
  auth: {
    welcomeBackBadge: string;
    loginHeroTitle: string;
    loginHeroDescription: string;
    loginTitle: string;
    loginDescription: string;
    email: string;
    password: string;
    name: string;
    login: string;
    loggingIn: string;
    invalidLogin: string;
    noAccount: string;
    createOne: string;
    registerBadge: string;
    registerHeroTitle: string;
    registerHeroDescription: string;
    registerTitle: string;
    registerDescription: string;
    createAccount: string;
    creatingAccount: string;
    alreadyHaveAccount: string;
    passwordPlaceholder: string;
    passwordHelp: string;
    registerSuccess: string;
    registerVerifyEmailSuccess: string;
    failedToRegister: string;
    failedToConnect: string;
    signOut: string;
    signingOut: string;
    forgotPassword: string;
    forgotPasswordBadge: string;
    forgotPasswordHeroTitle: string;
    forgotPasswordHeroDescription: string;
    forgotPasswordTitle: string;
    forgotPasswordDescription: string;
    sendResetLink: string;
    sendingResetLink: string;
    resetRequestSuccess: string;
    resetRequestFailed: string;
    rememberPassword: string;
    backToLogin: string;
    setNewPasswordBadge: string;
    setNewPasswordHeroTitle: string;
    setNewPasswordHeroDescription: string;
    resetPasswordTitle: string;
    resetPasswordDescription: string;
    newPassword: string;
    confirmPassword: string;
    repeatPassword: string;
    resetPassword: string;
    resettingPassword: string;
    resetMissingToken: string;
    resetPasswordTooShort: string;
    passwordsDoNotMatch: string;
    resetPasswordFailed: string;
    resetPasswordSuccess: string;
    invalidResetLink: string;
    requestNewResetLink: string;
    loadingResetForm: string;
  };
  account: {
    badge: string;
    title: string;
    description: string;
    quickActions: string;
    browseProducts: string;
    browseProductsDescription: string;
    viewCart: string;
    viewCartDescription: string;
    myOrders: string;
    myOrdersDescription: string;
    adminDashboard: string;
    adminDashboardDescription: string;
    noEmail: string;
    customer: string;
    accountSetupRequired: string;
    accountSetupDescription: string;
    emailVerification: string;
    verified: string;
    notVerified: string;
    phoneNumber: string;
    added: string;
    missing: string;
    updateProfile: string;
    updateProfileDescription: string;
    sendingVerificationEmail: string;
    resendVerificationEmail: string;
    failedToSendVerificationEmail: string;
    verificationEmailSent: string;
    emailStatus: string;
    phone: string;
    notAdded: string;
  };
  profile: {
    badge: string;
    title: string;
    description: string;
    emailStatus: string;
    verified: string;
    notVerified: string;
    emailChangeHelp: string;
    name: string;
    phoneNumber: string;
    phoneHelp: string;
    saveProfile: string;
    saving: string;
    backToAccount: string;
    failedToUpdate: string;
    updatedSuccessfully: string;
    failedToConnect: string;
  };

  legal: {
    common: {
      policyBadge: string;
      lastUpdatedLabel: string;
      lastUpdatedDate: string;
      usefulLinks: string;
      footerLinks: {
        terms: string;
        privacy: string;
        shipping: string;
        returns: string;
        contact: string;
      };
    };
    notices: {
      bySigningIn: string;
      byCreatingAccount: string;
      byPlacingOrder: string;
      privacyPolicy: string;
      termsOfUse: string;
      shippingPolicy: string;
      returnsPolicy: string;
      and: string;
    };
    pages: Record<
      LegalPageKey,
      {
        title: string;
        description: string;
        sections: LegalSection[];
      }
    >;
  };

  admin: {
    dashboard: {
      badge: string;
      title: string;
      description: string;
      productsTitle: string;
      productsBadge: string;
      productsDescription: string;
      ordersTitle: string;
      ordersBadge: string;
      ordersDescription: string;
      categoriesTitle: string;
      categoriesBadge: string;
      categoriesDescription: string;
    };
    categories: {
      badge: string;
      title: string;
      description: string;
      backToDashboard: string;
      createTitle: string;
      createDescription: string;
      name: string;
      namePlaceholder: string;
      slug: string;
      slugPlaceholder: string;
      make: string;
      createButton: string;
      creating: string;
      editTitle: string;
      editDescription: string;
      saveButton: string;
      saving: string;
      cancel: string;
      listTitle: string;
      listDescription: string;
      refresh: string;
      noCategoriesYet: string;
      productCount: string;
      deleteBlockedHint: string;
      edit: string;
      delete: string;
      deleting: string;
      deleteConfirm: string;
      cannotDeleteWithProducts: string;
      failedToLoad: string;
      failedToConnect: string;
      failedToCreate: string;
      created: string;
      failedToUpdate: string;
      updated: string;
      failedToDelete: string;
      deleted: string;
    };
    orders: {
      badge: string;
      title: string;
      description: string;
      dashboard: string;
      refresh: string;
      totalOrders: string;
      pendingOrders: string;
      revenueExcludingCancelled: string;
      unpaidNotice: string;
      order: string;
      placed: string;
      customer: string;
      unnamedCustomer: string;
      total: string;
      orderStatus: string;
      paymentStatus: string;
      items: string;
      contactDetails: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      deliveryDetails: string;
      deliveryArea: string;
      deliveryCity: string;
      deliveryAddress: string;
      deliveryNotes: string;
      deliveryPrice: string;
      pickupAgreement: string;
      yes: string;
      notProvided: string;
      notRequired: string;
      adminNote: string;
      adminNotePlaceholder: string;
      saveNote: string;
      saving: string;
      noteWarning: string;
      noImage: string;
      noOrdersTitle: string;
      noOrdersDescription: string;
      unavailableTitle: string;
      tryAgain: string;
      failedToLoad: string;
      failedToConnect: string;
      failedToUpdateStatus: string;
      failedToUpdatePayment: string;
      failedToSaveNote: string;
      statuses: Record<string, string>;
      paymentStatuses: Record<string, string>;
    };
    products: {
      badge: string;
      title: string;
      description: string;
      backToDashboard: string;
      activeProducts: string;
      archivedProducts: string;
      categories: string;
      createProduct: string;
      createProductDescription: string;
      productName: string;
      productNamePlaceholder: string;
      slug: string;
      slugPlaceholder: string;
      make: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      price: string;
      stock: string;
      category: string;
      selectCategory: string;
      featuredProduct: string;
      images: string;
      imageUrlPlaceholder: string;
      addUrl: string;
      imageHelp: string;
      productPreview: string;
      remove: string;
      createProductButton: string;
      creating: string;
      editProduct: string;
      editProductDescription: string;
      cancel: string;
      saveProduct: string;
      saving: string;
      newCategory: string;
      categoryName: string;
      categoryNamePlaceholder: string;
      categorySlug: string;
      categorySlugPlaceholder: string;
      createCategory: string;
      creatingCategory: string;
      categoryList: string;
      noCategoriesYet: string;
      productList: string;
      productListDescription: string;
      refresh: string;
      noProductsYet: string;
      noImage: string;
      featured: string;
      archived: string;
      edit: string;
      archive: string;
      archiving: string;
      restore: string;
      restoring: string;
      updateStock: string;
      stockSaving: string;
      failedToLoadProducts: string;
      failedToLoadCategories: string;
      failedToConnect: string;
      failedToUploadImage: string;
      imageUploaded: string;
      failedToCreateProduct: string;
      productCreated: string;
      failedToUpdateProduct: string;
      productUpdated: string;
      failedToArchiveProduct: string;
      productArchived: string;
      failedToRestoreProduct: string;
      productRestored: string;
      failedToUpdateStock: string;
      stockUpdated: string;
      failedToCreateCategory: string;
      categoryCreated: string;
    };
  };
};

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brand: {
      name: "Loot Corner",
    },
    nav: {
      home: "Home",
      products: "Products",
      cart: "Cart",
      orders: "Orders",
      account: "Account",
    },
    actions: {
      switchToArabic: "عربي",
      switchToEnglish: "EN",
      lightMode: "Light",
      darkMode: "Dark",
      browseProducts: "Browse products",
      viewCart: "View cart",
      backToProducts: "Back to products",
      clearFilters: "Clear filters",
    },
    footer: {
      rights: "All rights reserved.",
      description:
        "Simple online shopping with cash on delivery and secure server-side order handling.",
    },
    home: {
      badge: "Simple shopping, clear checkout",
      titleStart: "Find your next pick at",
      titleBrand: "Loot Corner",
      description:
        "Browse products, add what you like to your cart, and place your order with cash on delivery. Fast, simple, and made for real store usage.",
      flowTitle: "Today's store flow",
      highlights: [
        {
          title: "Browse products",
          description:
            "Explore available items with clear stock and price details.",
        },
        {
          title: "Add to cart",
          description:
            "Build your cart before placing a cash-on-delivery order.",
        },
        {
          title: "Track orders",
          description:
            "View your order status after checkout from your account.",
        },
      ],
      stats: [
        {
          title: "Mobile first",
          description:
            "The layout starts simple on phones, then expands on larger screens.",
        },
        {
          title: "Real backend",
          description:
            "Products, cart, checkout, orders, and admin actions are handled by your server routes.",
        },
        {
          title: "Original UI",
          description:
            "No copied templates, no paid UI kit components, and no random licensed assets.",
        },
      ],
    },
    products: {
      badge: "Shop",
      title: "Products",
      description:
        "Browse available products, filter by category, and open any item to view details before adding it to your cart.",
      searchLabel: "Search products",
      searchPlaceholder: "Search by name or category...",
      allProducts: "All products",
      selectedCategory: "Selected category",
      showing: "Showing",
      productSingular: "product",
      productPlural: "products",
      noProductsTitle: "No products found",
      noProductsDescription:
        "Try changing the category or searching with a different word.",
      failedToLoad: "Failed to load products.",
      failedToConnect: "Failed to connect to the server.",
      noImage: "No image",
      featured: "Featured",
      soldOut: "Sold out",
      out: "Out",
      left: "left",
      inStock: "in stock",
      outOfStock: "Out of stock",
      descriptionTitle: "Description",
      noDescription: "No description available for this product yet.",
      payment: "Payment",
      cashOnDelivery: "Cash on delivery",
      category: "Category",
      productId: "Product ID",
      stockNote:
        "Adding to cart does not reserve stock. Stock is checked again when the order is placed.",
      productNotFound: "Product not found",
      productUnavailable:
        "This product is unavailable or may have been removed.",
      image: "Image",
      of: "of",
    },
    cart: {
      badge: "Checkout",
      title: "Your cart",
      description: "Review your items before placing a cash-on-delivery order.",
      itemSingular: "item",
      itemPlural: "items",
      cartUnavailable: "Cart unavailable",
      tryAgain: "Try again",
      emptyTitle: "Your cart is empty",
      emptyDescription:
        "Add products to your cart first, then come back here to place your order.",
      orderPlacedTitle: "Order placed successfully",
      orderPlacedDescription:
        "Your order was created. You can view its status from your orders page.",
      orderId: "Order ID",
      total: "Total",
      payment: "Payment",
      status: "Status",
      viewOrders: "View my orders",
      continueShopping: "Continue shopping",
      unavailableNotice:
        "Some items are unavailable or exceed current stock. Remove them or reduce their quantity before placing the order.",
      each: "each",
      subtotal: "Subtotal",
      remove: "Remove",
      removing: "Removing...",
      noImage: "No image",
      productArchived: "This product is no longer available.",
      productOutOfStock: "This product is currently out of stock.",
      onlyLeft: "Only {stock} left in stock.",
      orderSummary: "Order summary",
      items: "Items",
      paymentMethod: "Payment method",
      estimatedTotal: "Estimated total",
      cashOnDelivery: "Cash on delivery",
      placeOrder: "Place order",
      placingOrder: "Placing order...",
      orderPlacedButton: "Order placed",
      stockServerNote:
        "Stock and prices are checked again on the server when the order is placed. This prevents incorrect totals or unavailable products from being accepted.",
      failedToLoad: "Failed to load cart.",
      failedToConnect: "Failed to connect to the server.",
      failedToUpdate: "Failed to update item.",
      failedToRemove: "Failed to remove item.",
      failedToPlaceOrder: "Failed to place order.",
      decreaseQuantity: "Decrease quantity",
      increaseQuantity: "Increase quantity",
      deliveryDetailsTitle: "Delivery details",
      deliveryDetailsDescription:
        "Choose the delivery area and add the address details needed to complete the order.",
      deliveryArea: "Delivery area",
      deliveryCity: "City or area",
      deliveryCityPlaceholder: "Example: Nablus",
      deliveryAddress: "Delivery address",
      deliveryAddressOptional: "Address/details (optional for pickup)",
      deliveryAddressPlaceholder:
        "Street, building, nearby landmark, or pickup details",
      deliveryNotes: "Delivery notes",
      deliveryNotesPlaceholder: "Optional notes for the store owner",
      productsTotal: "Products total",
      deliveryPrice: "Delivery price",
      finalTotal: "Final total",
      reviewOrder: "Review order",
      confirmOrderTitle: "Confirm your order",
      confirmOrderDescription:
        "Review the products total, delivery price, final total, contact info, and delivery details before placing the order.",
      contactInfo: "Contact info",
      customerName: "Name",
      customerEmail: "Email",
      customerPhone: "Phone",
      savedAccountContact:
        "These details come from your account and may be used by the store owner to confirm the order.",
      cancel: "Cancel",
      confirmPlaceOrder: "Confirm and place order",
      deliveryCityRequired: "Please enter the city or area.",
      deliveryAddressRequired: "Please enter a delivery address.",
      pickupAgreementRequired:
        "Please agree or coordinate with the store owner on WhatsApp before choosing the Nablus receive point.",
    },
    delivery: {
      currency: "NIS",
      free: "Free",
      areas: {
        nablus_receive_point: {
          label: "Nablus receive point",
          note: "Free receive/pickup option in Nablus. The customer must agree or coordinate with the store owner on WhatsApp before receiving the order.",
          agreementLabel:
            "I understand this is a free receive/pickup option in Nablus and I must agree or coordinate with the store owner on WhatsApp before receiving the order.",
        },
        west_bank_cities: {
          label: "West Bank cities",
        },
        jerusalem: {
          label: "Jerusalem",
        },
        lands_48: {
          label: "48 lands",
        },
        west_jerusalem_area: {
          label: "West Jerusalem, Ein Rafa, Ein Naqouba, Abu Ghosh",
        },
      },
    },
    orders: {
      badge: "Account",
      title: "My orders",
      description:
        "Track your order history, payment status, and purchased items.",
      totalOrders: "Total orders",
      activeOrders: "Active orders",
      totalSpent: "Total spent",
      ordersUnavailable: "Orders unavailable",
      tryAgain: "Try again",
      noOrdersTitle: "No orders yet",
      noOrdersDescription:
        "When you place an order, it will appear here with its status, payment state, and product details.",
      browseProducts: "Browse products",
      refresh: "Refresh",
      order: "Order",
      placed: "Placed",
      total: "Total",
      payment: "Payment",
      items: "Items",
      quantity: "Quantity",
      subtotal: "Subtotal",
      noImage: "No image",
      deliveryDetails: "Delivery details",
      deliveryArea: "Delivery area",
      deliveryCity: "City or area",
      deliveryAddress: "Delivery address",
      deliveryNotes: "Delivery notes",
      deliveryPrice: "Delivery price",
      pickupAgreement: "Pickup agreement",
      yes: "Yes",
      notProvided: "Not provided",
      notRequired: "Not required",
      failedToLoad: "Failed to load orders.",
      failedToConnect: "Failed to connect to the server.",
      statuses: {
        PENDING: "Pending",
        PROCESSING: "Processing",
        SHIPPED: "Shipped",
        DELIVERED: "Delivered",
        CANCELLED: "Cancelled",
      },
      paymentMethods: {
        CASH_ON_DELIVERY: "Cash on delivery",
      },
      paymentStatuses: {
        UNPAID: "Unpaid",
        PAID: "Paid",
      },
    },
    auth: {
      welcomeBackBadge: "Welcome back",
      loginHeroTitle: "Sign in and continue shopping.",
      loginHeroDescription:
        "Access your cart, checkout, and order history using your Loot Corner account.",
      loginTitle: "Login",
      loginDescription: "Enter your email and password to access your account.",
      email: "Email",
      password: "Password",
      name: "Name",
      login: "Login",
      loggingIn: "Logging in...",
      invalidLogin: "Invalid email or password.",
      noAccount: "Don't have an account?",
      createOne: "Create one",
      registerBadge: "Join Loot Corner",
      registerHeroTitle: "Create an account before checkout.",
      registerHeroDescription:
        "Your account lets you save your cart, place orders, and view order history.",
      registerTitle: "Register",
      registerDescription: "Create your customer account.",
      createAccount: "Create account",
      creatingAccount: "Creating account...",
      alreadyHaveAccount: "Already have an account?",
      passwordPlaceholder: "At least 8 characters",
      passwordHelp:
        "Use a strong password. The server must hash it before saving.",
      registerSuccess: "Account created successfully. Redirecting to login...",
      registerVerifyEmailSuccess:
        "Account created. Please check your email to verify your account.",
      failedToRegister: "Failed to create account.",
      failedToConnect: "Failed to connect to the server.",
      signOut: "Sign out",
      signingOut: "Signing out...",
      forgotPassword: "Forgot password?",
      forgotPasswordBadge: "Account recovery",
      forgotPasswordHeroTitle: "Reset your password securely.",
      forgotPasswordHeroDescription:
        "Enter your account email and we will send a reset link. In development, the link appears in your terminal because SMTP is not configured yet.",
      forgotPasswordTitle: "Forgot password?",
      forgotPasswordDescription:
        "Enter your email address and check your inbox for a reset link.",
      sendResetLink: "Send reset link",
      sendingResetLink: "Sending reset link...",
      resetRequestSuccess:
        "If an account exists with this email, a password reset link has been sent.",
      resetRequestFailed: "Failed to request password reset. Please try again.",
      rememberPassword: "Remember your password?",
      backToLogin: "Back to login",
      setNewPasswordBadge: "Set new password",
      setNewPasswordHeroTitle: "Choose a new secure password.",
      setNewPasswordHeroDescription:
        "Use at least 8 characters. After reset, old sessions are revoked by the auth configuration.",
      resetPasswordTitle: "Reset password",
      resetPasswordDescription: "Enter your new password below.",
      newPassword: "New password",
      confirmPassword: "Confirm password",
      repeatPassword: "Repeat password",
      resetPassword: "Reset password",
      resettingPassword: "Resetting password...",
      resetMissingToken: "This reset link is missing a token.",
      resetPasswordTooShort: "Password must be at least 8 characters.",
      passwordsDoNotMatch: "Passwords do not match.",
      resetPasswordFailed: "Failed to reset password.",
      resetPasswordSuccess:
        "Password reset successfully. Redirecting to login...",
      invalidResetLink:
        "This reset link is invalid or expired. Please request a new one.",
      requestNewResetLink: "Request a new reset link",
      loadingResetForm: "Loading reset form...",
    },
    account: {
      badge: "Account",
      title: "My account",
      description: "View your account details and quick links.",
      quickActions: "Quick actions",
      browseProducts: "Browse products",
      browseProductsDescription:
        "Continue shopping and add items to your cart.",
      viewCart: "View cart",
      viewCartDescription: "Review items before placing an order.",
      myOrders: "My orders",
      myOrdersDescription: "Track order status and payment state.",
      adminDashboard: "Admin dashboard",
      adminDashboardDescription: "Manage products, orders, and store data.",
      noEmail: "No email available",
      customer: "Customer",
      accountSetupRequired: "Account setup required before checkout",
      accountSetupDescription:
        "You can browse products and manage your account, but checkout requires a verified email and a phone number so the store admin can confirm your order.",
      emailVerification: "Email verification",
      verified: "verified",
      notVerified: "not verified",
      phoneNumber: "Phone number",
      added: "added",
      missing: "missing",
      updateProfile: "Update profile",
      updateProfileDescription:
        "Add or update your phone number before checkout.",
      sendingVerificationEmail: "Sending verification email...",
      resendVerificationEmail: "Resend verification email",
      failedToSendVerificationEmail: "Failed to send verification email.",
      verificationEmailSent:
        "Verification email sent. Check your inbox, or check the terminal in development.",
      emailStatus: "Email status",
      phone: "Phone",
      notAdded: "Not added",
    },
    profile: {
      badge: "Profile",
      title: "Update your profile",
      description:
        "Your phone number is used by the store admin to confirm cash-on-delivery orders.",
      emailStatus: "Email status",
      verified: "Verified",
      notVerified: "Not verified",
      emailChangeHelp:
        "Email changes will be added later because they need a separate verification flow.",
      name: "Name",
      phoneNumber: "Phone number",
      phoneHelp:
        "Phone numbers are required before checkout. They are not verified by SMS yet.",
      saveProfile: "Save profile",
      saving: "Saving...",
      backToAccount: "Back to account",
      failedToUpdate: "Failed to update profile.",
      updatedSuccessfully: "Profile updated successfully.",
      failedToConnect: "Failed to connect to the server.",
    },
    legal: {
      common: {
        policyBadge: "Store policy",
        lastUpdatedLabel: "Last updated",
        lastUpdatedDate: "May 22, 2026",
        usefulLinks: "Useful links",
        footerLinks: {
          terms: "Terms",
          privacy: "Privacy",
          shipping: "Shipping",
          returns: "Returns",
          contact: "Contact",
        },
      },
      notices: {
        bySigningIn: "By signing in, you agree to our",
        byCreatingAccount: "By creating an account, you agree to our",
        byPlacingOrder: "By placing this order, you agree to our",
        privacyPolicy: "Privacy Policy",
        termsOfUse: "Terms of Use",
        shippingPolicy: "Shipping Policy",
        returnsPolicy: "Returns Policy",
        and: "and",
      },
      pages: {
        terms: {
          title: "Terms of Use",
          description:
            "These terms explain the basic rules for using Loot Corner, creating an account, and placing cash-on-delivery orders.",
          sections: [
            {
              title: "1. About the store",
              paragraphs: [
                "Loot Corner is an online store for physical products including action figures, flags, posters, retro consoles, CDs, keychains, patches, and similar items.",
              ],
            },
            {
              title: "2. Accounts",
              paragraphs: [
                "You may need an account to place orders, view your order history, and manage your profile information.",
                "You are responsible for keeping your login details safe and for providing accurate account information.",
              ],
            },
            {
              title: "3. Orders and payment",
              paragraphs: [
                "Orders are currently paid by cash on delivery.",
                "Adding products to the cart does not reserve stock. Stock and prices are checked again when the order is placed.",
                "The store may contact you using your phone number or email to confirm the order before delivery.",
              ],
            },
            {
              title: "4. Product information",
              paragraphs: [
                "We try to keep product names, prices, images, descriptions, and stock information accurate. However, mistakes may happen.",
                "If an error is found after an order is placed, the store may contact you to correct, cancel, or update the order.",
              ],
            },
            {
              title: "5. Cancellations",
              paragraphs: [
                "You may request to cancel an order as long as it has not already been sent for delivery.",
                "Once the order is on its way, cancellation may not be possible.",
              ],
            },
            {
              title: "6. Website availability",
              paragraphs: [
                "The website may sometimes be unavailable because of maintenance, technical issues, internet problems, or third-party service issues.",
                "The store will try to keep the website working, but uninterrupted access is not guaranteed.",
              ],
            },
            {
              title: "7. Changes to this policy",
              paragraphs: [
                "We may update this Privacy Policy or other store policies from time to time.",
                "When we make changes, we will update the “Last updated” date on the relevant page.",
                "Continued use of the website or placing orders after changes are published means you accept the updated policy.",
              ],
            },
            {
              title: "8. Contact",
              paragraphs: [
                "For questions about orders or these terms, contact us by WhatsApp or phone at +972594022010.",
              ],
            },
          ],
        },
        privacy: {
          title: "Privacy Policy",
          description:
            "This policy explains what information the store collects, why it is used, and which services may process it.",
          sections: [
            {
              title: "1. Information we collect",
              paragraphs: [
                "The website currently collects or stores information such as:",
              ],
              items: [
                "Name, email address, and phone number.",
                "Account details, email verification status, and order history.",
                "Cart items, ordered products, quantities, prices, totals, payment method, and payment status.",
                "Customer name, email, and phone snapshot at the time an order is placed.",
                "Session information, IP address, and user-agent for login, security, and rate limiting.",
                "Theme and language preference stored in your browser.",
              ],
            },
            {
              title: "2. Information not currently collected",
              paragraphs: [
                "The website does not currently collect online card payment details, customer-uploaded images, or delivery address fields.",
                "Important future note: if delivery address, city, or delivery area fields are added later, this Privacy Policy, Shipping Policy, checkout text, and database documentation should be updated.",
              ],
            },
            {
              title: "3. How we use information",
              paragraphs: [
                "We use information to create and manage accounts, process orders, contact customers about orders, show order history, protect the website, prevent abuse, and maintain store operations.",
              ],
            },
            {
              title: "4. Emails and messages",
              paragraphs: [
                "The website may send account-related emails such as verification or password reset emails.",
                "The store may also send order-related messages.",
                "Marketing messages should only be sent where the customer has agreed or where the store has a valid permission basis.",
              ],
            },
            {
              title: "5. Cookies, sessions, and local storage",
              paragraphs: [
                "The website uses essential session/authentication data to keep users signed in and protect accounts.",
                "It may also store theme and language preferences in the browser.",
                "Security and rate-limiting systems may process IP addresses and request activity.",
                "The website does not currently use Google Analytics, Meta Pixel, TikTok Pixel, or advertising tracking pixels.",
              ],
            },
            {
              title: "6. Service providers",
              paragraphs: [
                "The website may use third-party services for hosting, database storage, image storage, email delivery, and rate limiting/security storage.",
                "These may include Render, Neon or another PostgreSQL provider, Cloudinary, Upstash Redis, Brevo or another SMTP email provider, and domain/DNS providers.",
              ],
            },
            {
              title: "7. Contact",
              paragraphs: [
                "To ask about privacy or request help with your account, contact us by WhatsApp or phone at +972594022010.",
              ],
            },
          ],
        },
        shipping: {
          title: "Shipping / Delivery Policy",
          description:
            "This policy explains the current delivery areas, estimated timing, and delivery prices.",
          sections: [
            {
              title: "1. Delivery areas",
              paragraphs: [
                "The store currently delivers to the West Bank, Jerusalem, 48 lands, West Jerusalem, Ein Rafa, Ein Naqouba, and Abu Ghosh.",
              ],
            },
            {
              title: "2. Delivery provider",
              paragraphs: [
                "Delivery is handled by a third-party shipping company.",
                "Delivery times may depend on the shipping company, location, weather, traffic, closures, holidays, or other events outside the store’s control.",
              ],
            },
            {
              title: "3. Estimated delivery time",
              paragraphs: [
                "Estimated delivery time is usually 1–2 days after the order is confirmed, unless the store tells you otherwise.",
              ],
            },
            {
              title: "4. Delivery prices",
              items: [
                "West Bank cities: 20 NIS.",
                "Jerusalem: 30 NIS.",
                "48 lands: 70 NIS.",
                "West Jerusalem, Ein Rafa, Ein Naqouba, and Abu Ghosh: 45 NIS.",
              ],
            },
            {
              title: "5. Delivery address note",
              paragraphs: [
                "The website does not currently collect a full delivery address during checkout.",
                "The store may contact you using your phone number to confirm delivery details before sending the order.",
              ],
            },
          ],
        },
        returns: {
          title: "Returns / Refunds Policy",
          description:
            "This policy explains when returns are accepted and how refunds are handled.",
          sections: [
            {
              title: "1. Return rule",
              paragraphs: [
                "Returns are accepted only if the product arrives damaged, defective, incorrect, or damaged during delivery.",
                "The customer must contact the store within 2 days of receiving the order.",
              ],
            },
            {
              title: "2. Items that cannot be returned",
              paragraphs: [
                "Items cannot be returned if they were used, damaged by the customer, or returned without a valid issue.",
              ],
            },
            {
              title: "3. Return shipping",
              paragraphs: [
                "If the return is accepted because of store or shipping-company damage, return shipping will be handled by the store or the shipping company.",
              ],
            },
            {
              title: "4. Refund method",
              paragraphs: [
                "Refunds are handled manually using a method agreed between the customer and the store.",
              ],
            },
            {
              title: "5. How to request help",
              paragraphs: [
                "Contact us by WhatsApp or phone at +972594022010 and include your order details, photos if the product is damaged, and a clear explanation of the issue.",
              ],
            },
          ],
        },
        contact: {
          title: "Contact",
          description:
            "Use this page to contact the store about orders, support, returns, or general questions.",
          sections: [
            {
              title: "Contact details",
              items: [
                "WhatsApp / Phone: +972594022010.",
                "Support email: Not available yet.",
                "Support hours: Support requests are handled as soon as reasonably possible during normal working days.",
              ],
            },
          ],
        },
      },
    },

    admin: {
      dashboard: {
        badge: "Admin",
        title: "Store dashboard",
        description:
          "Manage products, orders, stock, payment state, and customer requests.",
        productsTitle: "Products",
        productsBadge: "Catalog",
        productsDescription:
          "Create, update, archive, restore, and manage stock for products.",
        ordersTitle: "Orders",
        ordersBadge: "Sales",
        ordersDescription:
          "Review customer orders, update order status, payment state, and internal notes.",
        categoriesTitle: "Categories",
        categoriesBadge: "Catalog",
        categoriesDescription:
          "Create, rename, and safely delete categories when no products are using them.",
      },
      categories: {
        badge: "Admin",
        title: "Categories",
        description:
          "Manage product categories. Deleting is blocked when products are still connected to the category.",
        backToDashboard: "Back to dashboard",
        createTitle: "Create category",
        createDescription:
          "Add a new category for products. Use a lowercase slug for clean URLs and filters.",
        name: "Name",
        namePlaceholder: "Accessories",
        slug: "Slug",
        slugPlaceholder: "accessories",
        make: "Make",
        createButton: "Create category",
        creating: "Creating...",
        editTitle: "Edit category",
        editDescription:
          "Changes affect product filters and future browsing. Existing order snapshots are not changed.",
        saveButton: "Save category",
        saving: "Saving...",
        cancel: "Cancel",
        listTitle: "Category list",
        listDescription:
          "Categories with connected products cannot be deleted. Move or archive related products first.",
        refresh: "Refresh",
        noCategoriesYet: "No categories yet.",
        productCount: "{count} connected products",
        deleteBlockedHint:
          "Delete is blocked because products are using this category.",
        edit: "Edit",
        delete: "Delete",
        deleting: "Deleting...",
        deleteConfirm: "Delete this category? This cannot be undone.",
        cannotDeleteWithProducts:
          "This category cannot be deleted while products are connected to it.",
        failedToLoad: "Failed to load categories.",
        failedToConnect: "Failed to connect to the server.",
        failedToCreate: "Failed to create category.",
        created: "Category created successfully.",
        failedToUpdate: "Failed to update category.",
        updated: "Category updated successfully.",
        failedToDelete: "Failed to delete category.",
        deleted: "Category deleted successfully.",
      },
      orders: {
        badge: "Admin",
        title: "Orders",
        description:
          "Review orders, update shipping status, mark payments, and keep private admin notes.",
        dashboard: "Dashboard",
        refresh: "Refresh",
        totalOrders: "Total orders",
        pendingOrders: "Pending orders",
        revenueExcludingCancelled: "Revenue excluding cancelled",
        unpaidNotice: "{count} order{plural} still marked as unpaid.",
        order: "Order",
        placed: "Placed",
        customer: "Customer",
        unnamedCustomer: "Unnamed customer",
        total: "Total",
        orderStatus: "Order status",
        paymentStatus: "Payment status",
        items: "Items",
        contactDetails: "Contact details",
        customerName: "Customer name",
        customerEmail: "Customer email",
        customerPhone: "Customer phone",
        deliveryDetails: "Delivery details",
        deliveryArea: "Delivery area",
        deliveryCity: "City or area",
        deliveryAddress: "Delivery address",
        deliveryNotes: "Delivery notes",
        deliveryPrice: "Delivery price",
        pickupAgreement: "Pickup agreement",
        yes: "Yes",
        notProvided: "Not provided",
        notRequired: "Not required",
        adminNote: "Admin note",
        adminNotePlaceholder: "Private note for admins only...",
        saveNote: "Save note",
        saving: "Saving...",
        noteWarning:
          "This note is for admins only. Never store passwords, payment card details, or private secrets here.",
        noImage: "No image",
        noOrdersTitle: "No orders yet",
        noOrdersDescription: "Customer orders will appear here after checkout.",
        unavailableTitle: "Admin orders unavailable",
        tryAgain: "Try again",
        failedToLoad: "Failed to load admin orders.",
        failedToConnect: "Failed to connect to the server.",
        failedToUpdateStatus: "Failed to update order status.",
        failedToUpdatePayment: "Failed to update payment status.",
        failedToSaveNote: "Failed to save admin note.",
        statuses: {
          PENDING: "Pending",
          PROCESSING: "Processing",
          SHIPPED: "Shipped",
          DELIVERED: "Delivered",
          CANCELLED: "Cancelled",
        },
        paymentStatuses: {
          UNPAID: "Unpaid",
          PAID: "Paid",
        },
      },
      products: {
        badge: "Admin",
        title: "Products",
        description:
          "Manage product creation, editing, stock, archive state, categories, and product images.",
        backToDashboard: "Back to dashboard",
        activeProducts: "Active products",
        archivedProducts: "Archived products",
        categories: "Categories",
        createProduct: "Create product",
        createProductDescription:
          "Add a new product to the store. Product visibility depends on archive state and stock.",
        productName: "Product name",
        productNamePlaceholder: "Gaming mouse",
        slug: "Slug",
        slugPlaceholder: "gaming-mouse",
        make: "Make",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Write a clear customer-facing description.",
        price: "Price",
        stock: "Stock",
        category: "Category",
        selectCategory: "Select category",
        featuredProduct: "Featured product",
        images: "Images",
        imageUrlPlaceholder: "https://...",
        addUrl: "Add URL",
        imageHelp:
          "JPG, PNG, or WEBP. Max 2MB. Uploaded images are sent to your protected admin upload route.",
        productPreview: "Product preview",
        remove: "Remove",
        createProductButton: "Create product",
        creating: "Creating...",
        editProduct: "Edit product",
        editProductDescription:
          "You are editing an existing product. Changes affect future shoppers, not historical order snapshots.",
        cancel: "Cancel",
        saveProduct: "Save product",
        saving: "Saving...",
        newCategory: "New category",
        categoryName: "Name",
        categoryNamePlaceholder: "Accessories",
        categorySlug: "Slug",
        categorySlugPlaceholder: "accessories",
        createCategory: "Create category",
        creatingCategory: "Creating...",
        categoryList: "Category list",
        noCategoriesYet: "No categories yet.",
        productList: "Product list",
        productListDescription:
          "Archive hides products from public browsing without deleting past order history.",
        refresh: "Refresh",
        noProductsYet: "No products yet.",
        noImage: "No image",
        featured: "Featured",
        archived: "Archived",
        edit: "Edit",
        archive: "Archive",
        archiving: "Archiving...",
        restore: "Restore",
        restoring: "Restoring...",
        updateStock: "Update stock",
        stockSaving: "Saving...",
        failedToLoadProducts: "Failed to load products.",
        failedToLoadCategories: "Failed to load categories.",
        failedToConnect: "Failed to connect to the server.",
        failedToUploadImage: "Failed to upload product image.",
        imageUploaded: "Image uploaded successfully.",
        failedToCreateProduct: "Failed to create product.",
        productCreated: "Product created successfully.",
        failedToUpdateProduct: "Failed to update product.",
        productUpdated: "Product updated successfully.",
        failedToArchiveProduct: "Failed to archive product.",
        productArchived: "Product archived successfully.",
        failedToRestoreProduct: "Failed to restore product.",
        productRestored: "Product restored successfully.",
        failedToUpdateStock: "Failed to update stock.",
        stockUpdated: "Stock updated successfully.",
        failedToCreateCategory: "Failed to create category.",
        categoryCreated: "Category created successfully.",
      },
    },
  },
  ar: {
    brand: {
      name: "لوت كورنر",
    },
    nav: {
      home: "الرئيسية",
      products: "المنتجات",
      cart: "السلة",
      orders: "طلباتي",
      account: "الحساب",
    },
    actions: {
      switchToArabic: "عربي",
      switchToEnglish: "EN",
      lightMode: "فاتح",
      darkMode: "داكن",
      browseProducts: "تصفح المنتجات",
      viewCart: "عرض السلة",
      backToProducts: "العودة إلى المنتجات",
      clearFilters: "مسح الفلاتر",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      description:
        "تسوق بسيط مع الدفع عند الاستلام ومعالجة آمنة للطلبات من جهة الخادم.",
    },
    home: {
      badge: "تسوق بسيط ودفع واضح",
      titleStart: "اعثر على اختيارك القادم في",
      titleBrand: "لوت كورنر",
      description:
        "تصفح المنتجات، أضف ما يعجبك إلى السلة، ثم أكمل طلبك مع الدفع عند الاستلام. تجربة بسيطة وسريعة ومناسبة لمتجر حقيقي.",
      flowTitle: "خطوات الشراء",
      highlights: [
        {
          title: "تصفح المنتجات",
          description: "استكشف المنتجات المتوفرة مع السعر والمخزون بوضوح.",
        },
        {
          title: "أضف إلى السلة",
          description: "جهز سلتك قبل إنشاء طلب الدفع عند الاستلام.",
        },
        {
          title: "تابع الطلبات",
          description: "شاهد حالة طلبك من صفحة الطلبات بعد الشراء.",
        },
      ],
      stats: [
        {
          title: "مناسب للجوال",
          description:
            "التصميم يبدأ بشكل بسيط على الهاتف ثم يتوسع على الشاشات الأكبر.",
        },
        {
          title: "Backend حقيقي",
          description:
            "المنتجات والسلة والدفع والطلبات ولوحة الإدارة تعتمد على مسارات الخادم.",
        },
        {
          title: "واجهة أصلية",
          description:
            "بدون نسخ قوالب، أو مكونات مدفوعة، أو أصول عشوائية ذات حقوق.",
        },
      ],
    },
    products: {
      badge: "المتجر",
      title: "المنتجات",
      description:
        "تصفح المنتجات المتوفرة، فلتر حسب التصنيف، وافتح أي منتج لرؤية التفاصيل قبل إضافته إلى السلة.",
      searchLabel: "البحث في المنتجات",
      searchPlaceholder: "ابحث بالاسم أو التصنيف...",
      allProducts: "كل المنتجات",
      selectedCategory: "التصنيف المحدد",
      showing: "عرض",
      productSingular: "منتج",
      productPlural: "منتجات",
      noProductsTitle: "لا توجد منتجات",
      noProductsDescription: "جرب تغيير التصنيف أو البحث باستخدام كلمة مختلفة.",
      failedToLoad: "فشل تحميل المنتجات.",
      failedToConnect: "فشل الاتصال بالخادم.",
      noImage: "لا توجد صورة",
      featured: "مميز",
      soldOut: "نفذ المخزون",
      out: "غير متوفر",
      left: "متبقي",
      inStock: "متوفر",
      outOfStock: "غير متوفر",
      descriptionTitle: "الوصف",
      noDescription: "لا يوجد وصف لهذا المنتج بعد.",
      payment: "الدفع",
      cashOnDelivery: "الدفع عند الاستلام",
      category: "التصنيف",
      productId: "رقم المنتج",
      stockNote:
        "الإضافة إلى السلة لا تحجز المخزون. يتم فحص المخزون مرة أخرى عند إنشاء الطلب.",
      productNotFound: "المنتج غير موجود",
      productUnavailable: "هذا المنتج غير متوفر أو ربما تمت إزالته.",
      image: "الصورة",
      of: "من",
    },
    cart: {
      badge: "الدفع",
      title: "سلتك",
      description: "راجع المنتجات قبل إنشاء طلب الدفع عند الاستلام.",
      itemSingular: "منتج",
      itemPlural: "منتجات",
      cartUnavailable: "السلة غير متاحة",
      tryAgain: "حاول مرة أخرى",
      emptyTitle: "السلة فارغة",
      emptyDescription: "أضف منتجات إلى السلة أولاً، ثم ارجع هنا لإنشاء الطلب.",
      orderPlacedTitle: "تم إنشاء الطلب بنجاح",
      orderPlacedDescription:
        "تم إنشاء طلبك. يمكنك متابعة حالته من صفحة الطلبات.",
      orderId: "رقم الطلب",
      total: "المجموع",
      payment: "الدفع",
      status: "الحالة",
      viewOrders: "عرض طلباتي",
      continueShopping: "متابعة التسوق",
      unavailableNotice:
        "بعض المنتجات غير متوفرة أو تتجاوز المخزون الحالي. احذفها أو قلل الكمية قبل إنشاء الطلب.",
      each: "للقطعة",
      subtotal: "المجموع الفرعي",
      remove: "حذف",
      removing: "جار الحذف...",
      noImage: "لا توجد صورة",
      productArchived: "هذا المنتج لم يعد متاحاً.",
      productOutOfStock: "هذا المنتج غير متوفر حالياً.",
      onlyLeft: "متبقي {stock} فقط في المخزون.",
      orderSummary: "ملخص الطلب",
      items: "المنتجات",
      paymentMethod: "طريقة الدفع",
      estimatedTotal: "المجموع المتوقع",
      cashOnDelivery: "الدفع عند الاستلام",
      placeOrder: "إنشاء الطلب",
      placingOrder: "جار إنشاء الطلب...",
      orderPlacedButton: "تم إنشاء الطلب",
      stockServerNote:
        "يتم فحص المخزون والأسعار مرة أخرى من الخادم عند إنشاء الطلب، لمنع قبول مجموع غير صحيح أو منتجات غير متوفرة.",
      failedToLoad: "فشل تحميل السلة.",
      failedToConnect: "فشل الاتصال بالخادم.",
      failedToUpdate: "فشل تحديث المنتج.",
      failedToRemove: "فشل حذف المنتج.",
      failedToPlaceOrder: "فشل إنشاء الطلب.",
      decreaseQuantity: "تقليل الكمية",
      increaseQuantity: "زيادة الكمية",
      deliveryDetailsTitle: "تفاصيل التوصيل",
      deliveryDetailsDescription:
        "اختر منطقة التوصيل وأضف تفاصيل العنوان اللازمة لإكمال الطلب.",
      deliveryArea: "منطقة التوصيل",
      deliveryCity: "المدينة أو المنطقة",
      deliveryCityPlaceholder: "مثال: نابلس",
      deliveryAddress: "عنوان التوصيل",
      deliveryAddressOptional: "العنوان/التفاصيل (اختياري للاستلام)",
      deliveryAddressPlaceholder:
        "الشارع، المبنى، علامة قريبة، أو تفاصيل الاستلام",
      deliveryNotes: "ملاحظات التوصيل",
      deliveryNotesPlaceholder: "ملاحظات اختيارية لصاحب المتجر",
      productsTotal: "مجموع المنتجات",
      deliveryPrice: "سعر التوصيل",
      finalTotal: "المجموع النهائي",
      reviewOrder: "مراجعة الطلب",
      confirmOrderTitle: "تأكيد الطلب",
      confirmOrderDescription:
        "راجع مجموع المنتجات، سعر التوصيل، المجموع النهائي، معلومات التواصل، وتفاصيل التوصيل قبل إنشاء الطلب.",
      contactInfo: "معلومات التواصل",
      customerName: "الاسم",
      customerEmail: "البريد الإلكتروني",
      customerPhone: "الهاتف",
      savedAccountContact:
        "هذه التفاصيل مأخوذة من حسابك وقد يستخدمها صاحب المتجر لتأكيد الطلب.",
      cancel: "إلغاء",
      confirmPlaceOrder: "تأكيد وإنشاء الطلب",
      deliveryCityRequired: "يرجى إدخال المدينة أو المنطقة.",
      deliveryAddressRequired: "يرجى إدخال عنوان التوصيل.",
      pickupAgreementRequired:
        "يرجى الموافقة أو التنسيق مع صاحب المتجر عبر واتساب قبل اختيار نقطة الاستلام في نابلس.",
    },
    delivery: {
      currency: "شيكل",
      free: "مجاني",
      areas: {
        nablus_receive_point: {
          label: "نقطة استلام في نابلس",
          note: "خيار استلام مجاني في نابلس. يجب على الزبون الموافقة أو التنسيق مع صاحب المتجر عبر واتساب قبل استلام الطلب.",
          agreementLabel:
            "أفهم أن هذا خيار استلام مجاني في نابلس ويجب أن أوافق أو أنسق مع صاحب المتجر عبر واتساب قبل استلام الطلب.",
        },
        west_bank_cities: {
          label: "مدن الضفة الغربية",
        },
        jerusalem: {
          label: "القدس",
        },
        lands_48: {
          label: "أراضي 48",
        },
        west_jerusalem_area: {
          label: "غرب القدس، عين رافا، عين نقوبا، أبو غوش",
        },
      },
    },
    orders: {
      badge: "الحساب",
      title: "طلباتي",
      description: "تابع سجل الطلبات، حالة الدفع، والمنتجات التي اشتريتها.",
      totalOrders: "إجمالي الطلبات",
      activeOrders: "الطلبات النشطة",
      totalSpent: "إجمالي المدفوع",
      ordersUnavailable: "الطلبات غير متاحة",
      tryAgain: "حاول مرة أخرى",
      noOrdersTitle: "لا توجد طلبات بعد",
      noOrdersDescription:
        "عند إنشاء طلب، سيظهر هنا مع حالته وحالة الدفع وتفاصيل المنتجات.",
      browseProducts: "تصفح المنتجات",
      refresh: "تحديث",
      order: "الطلب",
      placed: "تم الإنشاء",
      total: "المجموع",
      payment: "الدفع",
      items: "المنتجات",
      quantity: "الكمية",
      subtotal: "المجموع الفرعي",
      noImage: "لا توجد صورة",
      deliveryDetails: "تفاصيل التوصيل",
      deliveryArea: "منطقة التوصيل",
      deliveryCity: "المدينة أو المنطقة",
      deliveryAddress: "عنوان التوصيل",
      deliveryNotes: "ملاحظات التوصيل",
      deliveryPrice: "سعر التوصيل",
      pickupAgreement: "موافقة الاستلام",
      yes: "نعم",
      notProvided: "غير متوفر",
      notRequired: "غير مطلوب",
      failedToLoad: "فشل تحميل الطلبات.",
      failedToConnect: "فشل الاتصال بالخادم.",
      statuses: {
        PENDING: "قيد الانتظار",
        PROCESSING: "قيد المعالجة",
        SHIPPED: "تم الشحن",
        DELIVERED: "تم التسليم",
        CANCELLED: "ملغي",
      },
      paymentMethods: {
        CASH_ON_DELIVERY: "الدفع عند الاستلام",
      },
      paymentStatuses: {
        UNPAID: "غير مدفوع",
        PAID: "مدفوع",
      },
    },
    auth: {
      welcomeBackBadge: "مرحباً بعودتك",
      loginHeroTitle: "سجل الدخول وتابع التسوق.",
      loginHeroDescription:
        "ادخل إلى السلة والدفع وسجل الطلبات باستخدام حسابك في لوت كورنر.",
      loginTitle: "تسجيل الدخول",
      loginDescription: "أدخل البريد الإلكتروني وكلمة المرور للوصول إلى حسابك.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      name: "الاسم",
      login: "تسجيل الدخول",
      loggingIn: "جار تسجيل الدخول...",
      invalidLogin: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      noAccount: "ليس لديك حساب؟",
      createOne: "أنشئ حساباً",
      registerBadge: "انضم إلى لوت كورنر",
      registerHeroTitle: "أنشئ حساباً قبل الدفع.",
      registerHeroDescription:
        "حسابك يساعدك على حفظ السلة، إنشاء الطلبات، ومتابعة سجل الطلبات.",
      registerTitle: "إنشاء حساب",
      registerDescription: "أنشئ حسابك كعميل.",
      createAccount: "إنشاء حساب",
      creatingAccount: "جار إنشاء الحساب...",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      passwordPlaceholder: "على الأقل 8 أحرف",
      passwordHelp:
        "استخدم كلمة مرور قوية. يجب أن يتم تشفيرها في الخادم قبل الحفظ.",
      registerSuccess: "تم إنشاء الحساب بنجاح. جار التحويل إلى تسجيل الدخول...",
      registerVerifyEmailSuccess:
        "تم إنشاء الحساب. يرجى فحص بريدك الإلكتروني لتأكيد الحساب.",
      failedToRegister: "فشل إنشاء الحساب.",
      failedToConnect: "فشل الاتصال بالخادم.",
      signOut: "تسجيل الخروج",
      signingOut: "جار تسجيل الخروج...",
      forgotPassword: "نسيت كلمة المرور؟",
      forgotPasswordBadge: "استعادة الحساب",
      forgotPasswordHeroTitle: "أعد تعيين كلمة المرور بأمان.",
      forgotPasswordHeroDescription:
        "أدخل بريد حسابك وسنرسل لك رابط إعادة التعيين. أثناء التطوير، سيظهر الرابط في التيرمنال لأن SMTP غير مفعّل بعد.",
      forgotPasswordTitle: "نسيت كلمة المرور؟",
      forgotPasswordDescription:
        "أدخل بريدك الإلكتروني وتحقق من صندوق الوارد للحصول على رابط إعادة التعيين.",
      sendResetLink: "إرسال رابط إعادة التعيين",
      sendingResetLink: "جاري إرسال الرابط...",
      resetRequestSuccess:
        "إذا كان هناك حساب بهذا البريد، فسيتم إرسال رابط إعادة تعيين كلمة المرور.",
      resetRequestFailed: "فشل طلب إعادة تعيين كلمة المرور. حاول مرة أخرى.",
      rememberPassword: "تذكرت كلمة المرور؟",
      backToLogin: "العودة لتسجيل الدخول",
      setNewPasswordBadge: "تعيين كلمة مرور جديدة",
      setNewPasswordHeroTitle: "اختر كلمة مرور جديدة وآمنة.",
      setNewPasswordHeroDescription:
        "استخدم 8 أحرف على الأقل. بعد إعادة التعيين، يتم إلغاء الجلسات القديمة من إعدادات المصادقة.",
      resetPasswordTitle: "إعادة تعيين كلمة المرور",
      resetPasswordDescription: "أدخل كلمة المرور الجديدة بالأسفل.",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      repeatPassword: "أعد كتابة كلمة المرور",
      resetPassword: "إعادة تعيين كلمة المرور",
      resettingPassword: "جاري إعادة التعيين...",
      resetMissingToken: "رابط إعادة التعيين لا يحتوي على الرمز المطلوب.",
      resetPasswordTooShort: "يجب أن تكون كلمة المرور 8 أحرف على الأقل.",
      passwordsDoNotMatch: "كلمتا المرور غير متطابقتين.",
      resetPasswordFailed: "فشل إعادة تعيين كلمة المرور.",
      resetPasswordSuccess:
        "تمت إعادة تعيين كلمة المرور بنجاح. سيتم تحويلك لتسجيل الدخول...",
      invalidResetLink:
        "رابط إعادة التعيين غير صالح أو منتهي الصلاحية. اطلب رابطاً جديداً.",
      requestNewResetLink: "طلب رابط جديد",
      loadingResetForm: "جاري تحميل نموذج إعادة التعيين...",
    },
    account: {
      badge: "الحساب",
      title: "حسابي",
      description: "اعرض تفاصيل حسابك والروابط السريعة.",
      quickActions: "إجراءات سريعة",
      browseProducts: "تصفح المنتجات",
      browseProductsDescription: "تابع التسوق وأضف منتجات إلى السلة.",
      viewCart: "عرض السلة",
      viewCartDescription: "راجع المنتجات قبل إنشاء الطلب.",
      myOrders: "طلباتي",
      myOrdersDescription: "تابع حالة الطلب وحالة الدفع.",
      adminDashboard: "لوحة الإدارة",
      adminDashboardDescription: "إدارة المنتجات والطلبات وبيانات المتجر.",
      noEmail: "لا يوجد بريد إلكتروني",
      customer: "عميل",
      accountSetupRequired: "يجب إكمال إعداد الحساب قبل إتمام الطلب",
      accountSetupDescription:
        "يمكنك تصفح المنتجات وإدارة حسابك، لكن إتمام الطلب يحتاج إلى بريد مؤكد ورقم هاتف حتى يتمكن مسؤول المتجر من تأكيد الطلب.",
      emailVerification: "تأكيد البريد الإلكتروني",
      verified: "مؤكد",
      notVerified: "غير مؤكد",
      phoneNumber: "رقم الهاتف",
      added: "مضاف",
      missing: "غير مضاف",
      updateProfile: "تحديث الملف الشخصي",
      updateProfileDescription: "أضف أو حدّث رقم هاتفك قبل إتمام الطلب.",
      sendingVerificationEmail: "جاري إرسال رسالة التحقق...",
      resendVerificationEmail: "إعادة إرسال رسالة التحقق",
      failedToSendVerificationEmail: "فشل إرسال رسالة التحقق.",
      verificationEmailSent:
        "تم إرسال رسالة التحقق. تحقق من بريدك، أو من التيرمنال أثناء التطوير.",
      emailStatus: "حالة البريد الإلكتروني",
      phone: "الهاتف",
      notAdded: "غير مضاف",
    },
    profile: {
      badge: "الملف الشخصي",
      title: "تحديث الملف الشخصي",
      description:
        "يستخدم مسؤول المتجر رقم هاتفك لتأكيد طلبات الدفع عند الاستلام.",
      emailStatus: "حالة البريد الإلكتروني",
      verified: "مؤكد",
      notVerified: "غير مؤكد",
      emailChangeHelp:
        "تغيير البريد الإلكتروني سيضاف لاحقاً لأنه يحتاج إلى خطوة تحقق منفصلة.",
      name: "الاسم",
      phoneNumber: "رقم الهاتف",
      phoneHelp:
        "رقم الهاتف مطلوب قبل إتمام الطلب. لم يتم تفعيله عبر SMS حالياً.",
      saveProfile: "حفظ الملف الشخصي",
      saving: "جاري الحفظ...",
      backToAccount: "العودة للحساب",
      failedToUpdate: "فشل تحديث الملف الشخصي.",
      updatedSuccessfully: "تم تحديث الملف الشخصي بنجاح.",
      failedToConnect: "فشل الاتصال بالخادم.",
    },
    legal: {
      common: {
        policyBadge: "سياسة المتجر",
        lastUpdatedLabel: "آخر تحديث",
        lastUpdatedDate: "22 مايو 2026",
        usefulLinks: "روابط مفيدة",
        footerLinks: {
          terms: "الشروط",
          privacy: "الخصوصية",
          shipping: "التوصيل",
          returns: "الإرجاع",
          contact: "التواصل",
        },
      },
      notices: {
        bySigningIn: "بتسجيل الدخول، أنت توافق على",
        byCreatingAccount: "بإنشاء حساب، أنت توافق على",
        byPlacingOrder: "بإنشاء هذا الطلب، أنت توافق على",
        privacyPolicy: "سياسة الخصوصية",
        termsOfUse: "شروط الاستخدام",
        shippingPolicy: "سياسة التوصيل",
        returnsPolicy: "سياسة الإرجاع",
        and: "و",
      },
      pages: {
        terms: {
          title: "شروط الاستخدام",
          description:
            "توضح هذه الشروط القواعد الأساسية لاستخدام لوت كورنر، إنشاء الحسابات، وإنشاء طلبات الدفع عند الاستلام.",
          sections: [
            {
              title: "1. عن المتجر",
              paragraphs: [
                "لوت كورنر هو متجر إلكتروني لبيع منتجات فعلية مثل المجسمات، الأعلام، البوسترات، أجهزة الألعاب القديمة، الأقراص، علاقات المفاتيح، الباتشات ومنتجات مشابهة.",
              ],
            },
            {
              title: "2. الحسابات",
              paragraphs: [
                "قد تحتاج إلى حساب لإنشاء الطلبات ومتابعة سجل الطلبات وتحديث بياناتك.",
                "أنت مسؤول عن الحفاظ على سرية بيانات الدخول وتقديم معلومات صحيحة.",
              ],
            },
            {
              title: "3. الطلبات والدفع",
              paragraphs: [
                "يتم الدفع حالياً عند الاستلام.",
                "إضافة المنتجات إلى السلة لا تعني حجز المخزون، ويتم فحص المخزون والأسعار مرة أخرى عند إنشاء الطلب.",
                "قد يتواصل المتجر معك عبر رقم الهاتف أو البريد الإلكتروني لتأكيد الطلب قبل التوصيل.",
              ],
            },
            {
              title: "4. معلومات المنتجات",
              paragraphs: [
                "نحاول عرض أسماء المنتجات والأسعار والصور والوصف والمخزون بدقة، لكن قد تحدث أخطاء.",
                "إذا ظهر خطأ بعد إنشاء الطلب، قد يتواصل المتجر معك لتصحيح الطلب أو إلغائه أو تحديثه.",
              ],
            },
            {
              title: "5. الإلغاء",
              paragraphs: [
                "يمكنك طلب إلغاء الطلب طالما لم يتم إرساله للتوصيل.",
                "بعد خروج الطلب للتوصيل، قد لا يكون الإلغاء ممكناً.",
              ],
            },
            {
              title: "6. توفر الموقع",
              paragraphs: [
                "قد يتوقف الموقع أحياناً بسبب الصيانة أو مشاكل تقنية أو مشاكل في الإنترنت أو خدمات خارجية.",
                "يحاول المتجر الحفاظ على عمل الموقع، لكن لا يوجد ضمان بأن يكون الموقع متاحاً بدون انقطاع دائماً.",
              ],
            },
            {
              title: "7. التغييرات على هذه السياسات",
              paragraphs: [
                "قد نقوم بتحديث شروط الاستخدام أو سياسة الخصوصية أو سياسة التوصيل أو سياسة الإرجاع أو أي سياسات أخرى للمتجر من وقت لآخر.",
                "عند إجراء أي تغييرات، سنقوم بتحديث تاريخ آخر تحديث في الصفحة المعنية.",
                "استمرار استخدام الموقع أو إنشاء الطلبات بعد نشر التغييرات يعني موافقتك على السياسة المحدّثة.",
              ],
            },
            {
              title: "8. التواصل",
              paragraphs: [
                "للاستفسار عن الطلبات أو هذه الشروط، يمكنك التواصل معنا عبر واتساب أو الهاتف على الرقم +972594022010.",
              ],
            },
          ],
        },
        privacy: {
          title: "سياسة الخصوصية",
          description:
            "توضح هذه السياسة البيانات التي يجمعها المتجر، سبب استخدامها، والخدمات التي قد تعالجها.",
          sections: [
            {
              title: "1. البيانات التي نجمعها",
              paragraphs: ["يجمع الموقع حالياً أو يخزن بيانات مثل:"],
              items: [
                "الاسم والبريد الإلكتروني ورقم الهاتف.",
                "بيانات الحساب، حالة تأكيد البريد الإلكتروني، وسجل الطلبات.",
                "عناصر السلة، المنتجات المطلوبة، الكميات، الأسعار، المجموع، طريقة الدفع وحالة الدفع.",
                "نسخة من اسم العميل وبريده الإلكتروني ورقم هاتفه وقت إنشاء الطلب.",
                "بيانات الجلسة، عنوان IP، ونوع المتصفح لأغراض تسجيل الدخول والأمان والحد من إساءة الاستخدام.",
                "تفضيل المظهر واللغة المخزن في المتصفح.",
              ],
            },
            {
              title: "2. بيانات لا نجمعها حالياً",
              paragraphs: [
                "لا يجمع الموقع حالياً بيانات بطاقات الدفع الإلكترونية أو صور مرفوعة من العملاء أو حقول عنوان التوصيل.",
                "ملاحظة مستقبلية مهمة: إذا تمت إضافة حقول عنوان التوصيل أو المدينة أو منطقة التوصيل لاحقاً، يجب تحديث سياسة الخصوصية وسياسة التوصيل ونصوص إنشاء الطلب وتوثيق قاعدة البيانات.",
              ],
            },
            {
              title: "3. كيف نستخدم البيانات",
              paragraphs: [
                "نستخدم البيانات لإنشاء وإدارة الحسابات، معالجة الطلبات، التواصل مع العملاء بخصوص الطلبات، عرض سجل الطلبات، حماية الموقع، منع إساءة الاستخدام، وتشغيل المتجر.",
              ],
            },
            {
              title: "4. البريد الإلكتروني والرسائل",
              paragraphs: [
                "قد يرسل الموقع رسائل متعلقة بالحساب مثل تأكيد البريد الإلكتروني أو إعادة تعيين كلمة المرور.",
                "قد يرسل المتجر أيضاً رسائل متعلقة بالطلبات.",
                "يجب إرسال الرسائل التسويقية فقط عند وجود موافقة من العميل أو أساس مناسب لذلك.",
              ],
            },
            {
              title: "5. ملفات الجلسة والتخزين المحلي",
              paragraphs: [
                "يستخدم الموقع بيانات جلسات أساسية لتسجيل الدخول وحماية الحسابات.",
                "قد يحفظ أيضاً تفضيلات اللغة والمظهر في المتصفح.",
                "قد تعالج أنظمة الأمان والحد من الطلبات عنوان IP ونشاط الطلبات.",
                "لا يستخدم الموقع حالياً أدوات تتبع إعلانية مثل Google Analytics أو Meta Pixel أو TikTok Pixel.",
              ],
            },
            {
              title: "6. مزودو الخدمات",
              paragraphs: [
                "قد يستخدم الموقع خدمات خارجية للاستضافة وقاعدة البيانات وتخزين الصور وإرسال البريد الإلكتروني والتخزين الخاص بالأمان والحد من الطلبات.",
                "قد تشمل هذه الخدمات Render و Neon أو مزود PostgreSQL آخر و Cloudinary و Upstash Redis و Brevo أو مزود SMTP آخر ومزودي النطاقات و DNS.",
              ],
            },
            {
              title: "7. التواصل",
              paragraphs: [
                "للاستفسار عن الخصوصية أو طلب المساعدة بخصوص الحساب، يمكنك التواصل معنا عبر واتساب أو الهاتف على الرقم +972594022010.",
              ],
            },
          ],
        },
        shipping: {
          title: "سياسة التوصيل",
          description:
            "توضح هذه السياسة مناطق التوصيل الحالية، المدة المتوقعة، وأسعار التوصيل.",
          sections: [
            {
              title: "1. مناطق التوصيل",
              paragraphs: [
                "يوصل المتجر حالياً إلى مدن الضفة، القدس، أراضي 48، القدس الغربية، عين رافا، عين نقوبا، وأبو غوش.",
              ],
            },
            {
              title: "2. مزود التوصيل",
              paragraphs: [
                "يتم التوصيل عن طريق شركة شحن خارجية.",
                "قد تختلف مدة التوصيل حسب شركة الشحن، المنطقة، الطقس، الحركة، الإغلاقات، العطل أو أمور أخرى خارج سيطرة المتجر.",
              ],
            },
            {
              title: "3. مدة التوصيل المتوقعة",
              paragraphs: [
                "مدة التوصيل المتوقعة عادة من يوم إلى يومين بعد تأكيد الطلب، إلا إذا أخبرك المتجر بغير ذلك.",
              ],
            },
            {
              title: "4. أسعار التوصيل",
              items: [
                "مدن الضفة: 20 شيكل.",
                "القدس: 30 شيكل.",
                "أراضي 48: 70 شيكل.",
                "القدس الغربية، عين رافا، عين نقوبا، وأبو غوش: 45 شيكل.",
              ],
            },
            {
              title: "5. ملاحظة بخصوص عنوان التوصيل",
              paragraphs: [
                "لا يجمع الموقع حالياً عنوان توصيل كامل أثناء إنشاء الطلب.",
                "قد يتواصل المتجر معك عبر رقم الهاتف لتأكيد تفاصيل التوصيل قبل إرسال الطلب.",
              ],
            },
          ],
        },
        returns: {
          title: "سياسة الإرجاع والاسترداد",
          description:
            "توضح هذه السياسة متى يتم قبول الإرجاع وكيف يتم التعامل مع الاسترداد.",
          sections: [
            {
              title: "1. قاعدة الإرجاع",
              paragraphs: [
                "يتم قبول الإرجاع فقط إذا وصل المنتج تالفاً أو معيباً أو خاطئاً أو تضرر أثناء التوصيل.",
                "يجب على العميل التواصل مع المتجر خلال يومين من استلام الطلب.",
              ],
            },
            {
              title: "2. منتجات لا يمكن إرجاعها",
              paragraphs: [
                "لا يمكن إرجاع المنتجات إذا تم استخدامها أو تضررت بسبب العميل أو لم يكن هناك سبب صحيح للإرجاع.",
              ],
            },
            {
              title: "3. شحن الإرجاع",
              paragraphs: [
                "إذا تم قبول الإرجاع بسبب خطأ من المتجر أو تلف من شركة الشحن، يتم التعامل مع تكلفة إرجاع الشحن من قبل المتجر أو شركة الشحن.",
              ],
            },
            {
              title: "4. طريقة الاسترداد",
              paragraphs: [
                "يتم الاسترداد يدوياً بالطريقة التي يتم الاتفاق عليها بين العميل والمتجر.",
              ],
            },
            {
              title: "5. طريقة طلب المساعدة",
              paragraphs: [
                "للتواصل، استخدم واتساب أو الهاتف على الرقم +972594022010 مع إرسال تفاصيل الطلب وصور المنتج إن كان تالفاً وشرح واضح للمشكلة.",
              ],
            },
          ],
        },
        contact: {
          title: "تواصل معنا",
          description:
            "استخدم هذه الصفحة للتواصل مع المتجر بخصوص الطلبات، الدعم، الإرجاع، أو الاستفسارات العامة.",
          sections: [
            {
              title: "بيانات التواصل",
              items: [
                "واتساب / هاتف: +972594022010.",
                "البريد الإلكتروني للدعم: غير متوفر حالياً.",
                "ساعات الدعم: يتم التعامل مع طلبات الدعم في أقرب وقت ممكن خلال أيام العمل العادية.",
              ],
            },
          ],
        },
      },
    },

    admin: {
      dashboard: {
        badge: "الإدارة",
        title: "لوحة إدارة المتجر",
        description:
          "إدارة المنتجات والطلبات والمخزون وحالة الدفع وطلبات العملاء.",
        productsTitle: "المنتجات",
        productsBadge: "الكتالوج",
        productsDescription:
          "إنشاء المنتجات وتعديلها وأرشفتها واستعادتها وإدارة المخزون.",
        ordersTitle: "الطلبات",
        ordersBadge: "المبيعات",
        ordersDescription:
          "مراجعة طلبات العملاء وتحديث حالة الطلب والدفع والملاحظات الداخلية.",
        categoriesTitle: "التصنيفات",
        categoriesBadge: "الكتالوج",
        categoriesDescription:
          "إنشاء التصنيفات وتعديلها وحذفها بأمان عندما لا تكون مرتبطة بمنتجات.",
      },
      categories: {
        badge: "الإدارة",
        title: "التصنيفات",
        description:
          "إدارة تصنيفات المنتجات. يتم منع الحذف عندما تكون هناك منتجات مرتبطة بالتصنيف.",
        backToDashboard: "العودة إلى لوحة الإدارة",
        createTitle: "إنشاء تصنيف",
        createDescription:
          "أضف تصنيفاً جديداً للمنتجات. استخدم رابطاً مختصراً بحروف إنجليزية صغيرة للفلاتر والروابط.",
        name: "الاسم",
        namePlaceholder: "إكسسوارات",
        slug: "الرابط المختصر",
        slugPlaceholder: "accessories",
        make: "إنشاء",
        createButton: "إنشاء التصنيف",
        creating: "جار الإنشاء...",
        editTitle: "تعديل التصنيف",
        editDescription:
          "التغييرات تؤثر على فلاتر المنتجات والتصفح لاحقاً، ولا تغير لقطات الطلبات السابقة.",
        saveButton: "حفظ التصنيف",
        saving: "جار الحفظ...",
        cancel: "إلغاء",
        listTitle: "قائمة التصنيفات",
        listDescription:
          "لا يمكن حذف التصنيفات المرتبطة بمنتجات. انقل المنتجات أو أرشفها أولاً.",
        refresh: "تحديث",
        noCategoriesYet: "لا توجد تصنيفات بعد.",
        productCount: "{count} منتجات مرتبطة",
        deleteBlockedHint: "الحذف ممنوع لأن هناك منتجات تستخدم هذا التصنيف.",
        edit: "تعديل",
        delete: "حذف",
        deleting: "جار الحذف...",
        deleteConfirm: "هل تريد حذف هذا التصنيف؟ لا يمكن التراجع عن ذلك.",
        cannotDeleteWithProducts:
          "لا يمكن حذف هذا التصنيف بينما توجد منتجات مرتبطة به.",
        failedToLoad: "فشل تحميل التصنيفات.",
        failedToConnect: "فشل الاتصال بالخادم.",
        failedToCreate: "فشل إنشاء التصنيف.",
        created: "تم إنشاء التصنيف بنجاح.",
        failedToUpdate: "فشل تحديث التصنيف.",
        updated: "تم تحديث التصنيف بنجاح.",
        failedToDelete: "فشل حذف التصنيف.",
        deleted: "تم حذف التصنيف بنجاح.",
      },
      orders: {
        badge: "الإدارة",
        title: "الطلبات",
        description:
          "راجع الطلبات، حدث حالة الشحن، علم المدفوعات، واحفظ ملاحظات خاصة بالإدارة.",
        dashboard: "لوحة الإدارة",
        refresh: "تحديث",
        totalOrders: "إجمالي الطلبات",
        pendingOrders: "الطلبات قيد الانتظار",
        revenueExcludingCancelled: "الإيراد بدون الطلبات الملغية",
        unpaidNotice: "يوجد {count} طلب{plural} ما زال غير مدفوع.",
        order: "الطلب",
        placed: "تم الإنشاء",
        customer: "العميل",
        unnamedCustomer: "عميل بدون اسم",
        total: "المجموع",
        orderStatus: "حالة الطلب",
        paymentStatus: "حالة الدفع",
        items: "المنتجات",
        contactDetails: "بيانات التواصل",
        customerName: "اسم العميل",
        customerEmail: "بريد العميل",
        customerPhone: "هاتف العميل",
        deliveryDetails: "تفاصيل التوصيل",
        deliveryArea: "منطقة التوصيل",
        deliveryCity: "المدينة أو المنطقة",
        deliveryAddress: "عنوان التوصيل",
        deliveryNotes: "ملاحظات التوصيل",
        deliveryPrice: "سعر التوصيل",
        pickupAgreement: "موافقة الاستلام",
        yes: "نعم",
        notProvided: "غير متوفر",
        notRequired: "غير مطلوب",
        adminNote: "ملاحظة الإدارة",
        adminNotePlaceholder: "ملاحظة خاصة بالإدارة فقط...",
        saveNote: "حفظ الملاحظة",
        saving: "جار الحفظ...",
        noteWarning:
          "هذه الملاحظة للإدارة فقط. لا تحفظ كلمات مرور أو بيانات بطاقات دفع أو أسرار خاصة هنا.",
        noImage: "لا توجد صورة",
        noOrdersTitle: "لا توجد طلبات بعد",
        noOrdersDescription: "ستظهر طلبات العملاء هنا بعد إنشاء الطلب.",
        unavailableTitle: "طلبات الإدارة غير متاحة",
        tryAgain: "حاول مرة أخرى",
        failedToLoad: "فشل تحميل طلبات الإدارة.",
        failedToConnect: "فشل الاتصال بالخادم.",
        failedToUpdateStatus: "فشل تحديث حالة الطلب.",
        failedToUpdatePayment: "فشل تحديث حالة الدفع.",
        failedToSaveNote: "فشل حفظ ملاحظة الإدارة.",
        statuses: {
          PENDING: "قيد الانتظار",
          PROCESSING: "قيد المعالجة",
          SHIPPED: "تم الشحن",
          DELIVERED: "تم التسليم",
          CANCELLED: "ملغي",
        },
        paymentStatuses: {
          UNPAID: "غير مدفوع",
          PAID: "مدفوع",
        },
      },
      products: {
        badge: "الإدارة",
        title: "المنتجات",
        description:
          "إدارة إنشاء المنتجات وتعديلها والمخزون وحالة الأرشفة والتصنيفات والصور.",
        backToDashboard: "العودة إلى لوحة الإدارة",
        activeProducts: "المنتجات النشطة",
        archivedProducts: "المنتجات المؤرشفة",
        categories: "التصنيفات",
        createProduct: "إنشاء منتج",
        createProductDescription:
          "أضف منتجاً جديداً إلى المتجر. ظهور المنتج يعتمد على حالة الأرشفة والمخزون.",
        productName: "اسم المنتج",
        productNamePlaceholder: "فأرة ألعاب",
        slug: "الرابط المختصر",
        slugPlaceholder: "gaming-mouse",
        make: "إنشاء",
        descriptionLabel: "الوصف",
        descriptionPlaceholder: "اكتب وصفاً واضحاً يظهر للعميل.",
        price: "السعر",
        stock: "المخزون",
        category: "التصنيف",
        selectCategory: "اختر التصنيف",
        featuredProduct: "منتج مميز",
        images: "الصور",
        imageUrlPlaceholder: "https://...",
        addUrl: "إضافة رابط",
        imageHelp:
          "JPG أو PNG أو WEBP. الحد الأقصى 2MB. يتم رفع الصور من خلال مسار رفع محمي للإدارة.",
        productPreview: "معاينة المنتج",
        remove: "حذف",
        createProductButton: "إنشاء المنتج",
        creating: "جار الإنشاء...",
        editProduct: "تعديل المنتج",
        editProductDescription:
          "أنت تعدل منتجاً موجوداً. التغييرات تؤثر على المتسوقين لاحقاً، ولا تغير بيانات الطلبات السابقة.",
        cancel: "إلغاء",
        saveProduct: "حفظ المنتج",
        saving: "جار الحفظ...",
        newCategory: "تصنيف جديد",
        categoryName: "الاسم",
        categoryNamePlaceholder: "إكسسوارات",
        categorySlug: "الرابط المختصر",
        categorySlugPlaceholder: "accessories",
        createCategory: "إنشاء التصنيف",
        creatingCategory: "جار الإنشاء...",
        categoryList: "قائمة التصنيفات",
        noCategoriesYet: "لا توجد تصنيفات بعد.",
        productList: "قائمة المنتجات",
        productListDescription:
          "الأرشفة تخفي المنتج من التصفح العام بدون حذف سجل الطلبات السابقة.",
        refresh: "تحديث",
        noProductsYet: "لا توجد منتجات بعد.",
        noImage: "لا توجد صورة",
        featured: "مميز",
        archived: "مؤرشف",
        edit: "تعديل",
        archive: "أرشفة",
        archiving: "جار الأرشفة...",
        restore: "استعادة",
        restoring: "جار الاستعادة...",
        updateStock: "تحديث المخزون",
        stockSaving: "جار الحفظ...",
        failedToLoadProducts: "فشل تحميل المنتجات.",
        failedToLoadCategories: "فشل تحميل التصنيفات.",
        failedToConnect: "فشل الاتصال بالخادم.",
        failedToUploadImage: "فشل رفع صورة المنتج.",
        imageUploaded: "تم رفع الصورة بنجاح.",
        failedToCreateProduct: "فشل إنشاء المنتج.",
        productCreated: "تم إنشاء المنتج بنجاح.",
        failedToUpdateProduct: "فشل تحديث المنتج.",
        productUpdated: "تم تحديث المنتج بنجاح.",
        failedToArchiveProduct: "فشل أرشفة المنتج.",
        productArchived: "تمت أرشفة المنتج بنجاح.",
        failedToRestoreProduct: "فشل استعادة المنتج.",
        productRestored: "تمت استعادة المنتج بنجاح.",
        failedToUpdateStock: "فشل تحديث المخزون.",
        stockUpdated: "تم تحديث المخزون بنجاح.",
        failedToCreateCategory: "فشل إنشاء التصنيف.",
        categoryCreated: "تم إنشاء التصنيف بنجاح.",
      },
    },
  },
};
