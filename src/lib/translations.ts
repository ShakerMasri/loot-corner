export type Language = "en" | "ar";

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
        categoriesBadge: "Later",
        categoriesDescription:
          "We can add a category management page after products and orders are polished.",
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
        categoriesBadge: "لاحقاً",
        categoriesDescription:
          "يمكننا إضافة صفحة إدارة التصنيفات بعد تحسين المنتجات والطلبات.",
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
