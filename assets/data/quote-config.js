(function (window) {
  "use strict";

  var uploadAccept = ".jpg,.jpeg,.png,.webp,.pdf,.svg,.ai,.eps,.zip";
  var sizes = ["Youth XS", "Youth S", "Youth M", "Youth L", "Youth XL", "Adult XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  function f(id, label, type, extra) {
    return Object.assign({ id: id, label: label, type: type || "text" }, extra || {});
  }

  function upload(id, label, help) {
    return f(id, label, "file", {
      accept: uploadAccept,
      multiple: true,
      optional: true,
      help: help || "Accepted files: JPG, PNG, WEBP, PDF, SVG, AI, EPS or ZIP."
    });
  }

  var benefits = [
    { title: "Focused questions", text: "We ask for the details that affect scope, timing and pricing.", icon: "list" },
    { title: "Clear next steps", text: "You receive a practical recommendation instead of a vague estimate.", icon: "check" },
    { title: "Local support", text: "A member of the Affinity Creative team reviews your request.", icon: "support" }
  ];

  var contact = [
    f("fullName", "Full name", "text", { required: true, autocomplete: "name" }),
    f("companyName", "Company name", "text", { autocomplete: "organization" }),
    f("email", "Email", "email", { required: true, autocomplete: "email" }),
    f("phone", "Phone", "tel", { required: true, autocomplete: "tel" }),
    f("preferredContact", "Preferred contact method", "radio", { required: true, options: ["Email", "Phone", "Text", "No preference"] }),
    f("additionalNotes", "Additional notes", "textarea", { optional: true }),
    f("consent", "I agree that Affinity Creative may contact me regarding this quote request.", "checkbox", { required: true })
  ];

  var deadline = [
    f("requiredDate", "Required date", "date", { required: true }),
    f("dateFlexible", "Is the date flexible?", "radio", { options: ["Yes", "No", "Not sure"] }),
    f("projectName", "Event or project name", "text", { optional: true }),
    f("fulfillment", "Pickup, delivery or installation", "radio", { options: ["Pickup", "Local delivery", "Shipping", "Installation", "Not sure"] }),
    f("location", "Delivery or installation address / GTA city", "text", { autocomplete: "street-address" }),
    f("postalCode", "Postal code", "text", { autocomplete: "postal-code" }),
    f("budget", "Approximate budget", "select", { optional: true, options: ["Not sure", "Under $1,000", "$1,000-$2,500", "$2,500-$5,000", "$5,000-$10,000", "More than $10,000"] })
  ];

  var configs = {
    apparel: {
      serviceName: "Custom Apparel",
      serviceKey: "apparel",
      accentClass: "quote-builder--apparel",
      headline: "Plan your apparel order in minutes.",
      description: "Tell us what garments you need, how many, how they should be decorated and when they are required. We will prepare a clear apparel recommendation and quote.",
      cta: "Start My Apparel Quote",
      benefits: benefits,
      steps: [
        { title: "Garment type", description: "Choose every garment included in the order.", icon: "shirt", fields: [
          f("garmentCategories", "Garment categories", "multiselect", { required: true, options: ["T-shirts", "Long-sleeve shirts", "Polo shirts", "Hoodies", "Full-zip hoodies", "Crewneck sweatshirts", "Jackets", "Work shirts", "Safety wear", "Hats", "Beanies", "Aprons", "Other"] }),
          f("garmentSupplier", "Who supplies the garments?", "radio", { required: true, options: ["Affinity Creative supplies them", "Customer will supply them", "Not sure"] }),
          f("preferredBrand", "Preferred garment brand", "text", { optional: true }),
          f("garmentColours", "Garment colour or colours", "text"),
          f("ageRange", "Adult, youth or both", "radio", { options: ["Adult", "Youth", "Both"] }),
          f("fitStyles", "Unisex, men's, women's or mixed styles", "radio", { options: ["Unisex", "Men's", "Women's", "Mixed styles", "Not sure"] }),
          f("garmentNotes", "Additional garment notes", "textarea", { optional: true })
        ] },
        { title: "Quantity and size breakdown", description: "A starting estimate is enough. Exact sizes can be confirmed later.", icon: "hash", fields: [
          f("totalQuantity", "Approximate total quantity", "number", { required: true, min: 1 }),
          f("garmentStyleCount", "Number of garment styles", "number", { min: 1 }),
          f("sizeBreakdown", "Size breakdown", "size-grid", { sizes: sizes }),
          f("recurringUniform", "Is this a recurring uniform order?", "radio", { options: ["Yes", "No", "Maybe"] }),
          f("sampleFirst", "Would you like a sample first?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("mixedNotes", "Notes regarding mixed colours or styles", "textarea", { optional: true })
        ] },
        { title: "Decoration and artwork", description: "Tell us how the garments should be branded and what artwork is available.", icon: "palette", fields: [
          f("decorationMethod", "Preferred decoration", "multiselect", { required: true, options: ["Embroidery", "DTF", "Screen printing", "Heat transfer", "Names and numbers", "Not sure - recommend the best method"] }),
          f("artworkStatus", "Artwork status", "radio", { required: true, options: ["Print-ready vector artwork", "PNG or JPG available", "Logo needs cleanup", "Design must be created", "No artwork yet"] }),
          upload("artworkFiles", "Upload artwork files"),
          f("artworkColours", "Approximate number of artwork colours", "text"),
          f("sameArtwork", "Is the same artwork used on every garment?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("designHelp", "Design assistance required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("artworkNotes", "Artwork notes", "textarea", { optional: true })
        ] },
        { title: "Decoration locations", description: "Select where each logo, name or graphic should appear.", icon: "pin", fields: [
          f("placements", "Placement", "multiselect", { required: true, options: ["Left chest", "Right chest", "Full front", "Upper back", "Full back", "Sleeve", "Cuff", "Hat front", "Hat side", "Hat back", "Other"] }),
          f("decorationDimensions", "Approximate decoration dimensions", "text"),
          f("locationCount", "Number of decoration locations per garment", "number", { min: 1 }),
          f("individualNames", "Individual names required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("individualNumbers", "Individual numbers required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("employeeTitles", "Employee titles required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("departmentLogos", "Different logos for different departments?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("bagging", "Folding or individual bagging required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("placementNotes", "Placement notes", "textarea", { optional: true })
        ] },
        { title: "Deadline, delivery and contact", description: "Share timing, delivery and the best way to reach you.", icon: "calendar", fields: deadline.concat(contact) }
      ]
    },

    embroidery: {
      serviceName: "Custom Embroidery",
      serviceKey: "embroidery",
      accentClass: "quote-builder--apparel",
      headline: "Get an embroidery quote built around the garment and stitch work.",
      description: "Tell us the garment, quantity, logo size, thread details and timeline so the embroidery quote reflects the real work.",
      cta: "Request an Embroidery Quote",
      benefits: benefits,
      steps: [
        { title: "Garment and material", description: "Tell us what will be embroidered and who supplies it.", icon: "shirt", fields: [
          f("embroideryItems", "Garment or item", "multiselect", { required: true, options: ["Polo", "T-shirt", "Hoodie", "Jacket", "Work shirt", "Safety garment", "Hat", "Beanie", "Bag", "Towel", "Customer-supplied item", "Other"] }),
          f("garmentMaterial", "Garment material", "text"),
          f("garmentColour", "Garment colour", "text"),
          f("hatStructure", "Structured or unstructured hat", "radio", { options: ["Structured", "Unstructured", "Not applicable", "Not sure"] }),
          f("itemFormat", "Flat item or finished garment", "radio", { options: ["Flat item", "Finished garment", "Mixed", "Not sure"] }),
          f("supplier", "Who supplies it?", "radio", { required: true, options: ["Affinity supplies garment", "Customer supplies it", "Not sure"] })
        ] },
        { title: "Quantity and size breakdown", description: "Estimate the pieces, sizes and number of designs.", icon: "hash", fields: [
          f("totalQuantity", "Total quantity", "number", { required: true, min: 1 }),
          f("garmentTypes", "Number of garment types", "number", { min: 1 }),
          f("sizeBreakdown", "Size breakdown", "size-grid", { sizes: sizes }),
          f("logoCount", "Number of logos/designs", "number", { min: 1 }),
          f("recurringOrder", "Recurring order?", "radio", { options: ["Yes", "No", "Maybe"] }),
          f("sampleApproval", "Sample approval required?", "radio", { options: ["Yes", "No", "Not sure"] })
        ] },
        { title: "Logo and digitizing", description: "Share the logo file and embroidery details if you know them.", icon: "palette", fields: [
          upload("logoFiles", "Upload logo"),
          f("fileTypeAvailable", "File type available", "multiselect", { options: ["AI", "EPS", "SVG", "PDF", "PNG", "JPG", "DST", "Other", "Not sure"] }),
          f("dstFile", "Existing embroidery DST file available?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("logoColours", "Approximate logo colours", "text"),
          f("digitizingRequired", "Logo requires digitizing?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("stitchCount", "Existing stitch count", "text", { optional: true }),
          f("embroideryType", "Standard embroidery or 3D puff", "radio", { options: ["Standard embroidery", "3D puff", "Both", "Not sure"] }),
          f("smallLettering", "Small lettering present?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("cleanupRequired", "Design cleanup required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("digitizingNotes", "Notes", "textarea", { optional: true })
        ] },
        { title: "Location, size and thread", description: "Select locations and thread preferences.", icon: "pin", fields: [
          f("locations", "Embroidery locations", "multiselect", { required: true, options: ["Left chest", "Right chest", "Sleeve", "Back", "Hat front", "Hat side", "Hat back", "Cuff", "Other"] }),
          f("desiredSize", "Desired width and height", "text"),
          f("locationCount", "Number of locations", "number", { min: 1 }),
          f("threadColours", "Thread colour preferences", "textarea", { optional: true }),
          f("specialThread", "Special thread or effects", "multiselect", { options: ["Metallic thread", "Reflective thread", "3D puff", "Individual names", "Individual numbers", "None", "Not sure"] })
        ] },
        { title: "Deadline and contact", description: "Share timing, delivery and the best way to reach you.", icon: "calendar", fields: deadline.concat(contact) }
      ]
    },

    "business-print": {
      serviceName: "Business Print",
      serviceKey: "business-print",
      accentClass: "quote-builder--print",
      headline: "Build a print quote with the right specifications.",
      headlineLines: ["Build a", "print quote", "with the", "right print", "details."],
      description: "Tell us the product, size, quantity, artwork status and finishing needs so the quote is accurate from the start.",
      cta: "Request Print Pricing",
      benefits: benefits,
      steps: [
        { title: "Print product", description: "Choose the printed piece you need priced.", icon: "file", fields: [
          f("printProducts", "Print product", "multiselect", { required: true, options: ["Business cards", "Flyers", "Postcards", "Brochures", "Folded brochures", "Door hangers", "Posters", "Presentation folders", "Menus", "NCR forms", "Booklets", "Labels", "Stickers", "Direct-mail pieces", "Other"] })
        ] },
        { title: "Size, pages and material", description: "Share the final size, pages and stock details if known.", icon: "measure", fields: [
          f("finishedWidth", "Finished width", "text"), f("finishedHeight", "Finished height", "text"),
          f("standardSize", "Standard-size selector", "select", { options: ["Not sure", "Business card", "4 x 6", "5 x 7", "8.5 x 11", "11 x 17", "Custom"] }),
          f("pageCount", "Number of pages", "number", { min: 1 }),
          f("flatOrFolded", "Flat or folded", "radio", { options: ["Flat", "Folded", "Not sure"] }),
          f("foldType", "Fold type", "text", { optional: true }),
          f("paperStock", "Paper stock, if known", "text", { optional: true }),
          f("paperWeight", "Paper weight, if known", "text", { optional: true }),
          f("coating", "Coated or uncoated", "radio", { options: ["Coated", "Uncoated", "Not sure"] }),
          f("sides", "Single-sided or double-sided", "radio", { options: ["Single-sided", "Double-sided", "Not sure"] }),
          f("colour", "Full colour or black and white", "radio", { options: ["Full colour", "Black and white", "Both", "Not sure"] })
        ] },
        { title: "Quantity and versions", description: "Tell us quantity, versions and variable details.", icon: "hash", fields: [
          f("quantity", "Quantity", "number", { required: true, min: 1 }),
          f("versionCount", "Number of versions", "number", { min: 1 }),
          f("variableDetails", "Variable or repeated details", "multiselect", { options: ["Different employee names", "Different addresses or locations", "Variable-data printing required", "Repeat order", "Previous sample or order available"] })
        ] },
        { title: "Artwork and finishing", description: "Upload artwork and select finishing options.", icon: "palette", fields: [
          upload("printArtwork", "Upload print-ready artwork"),
          f("designRequired", "Design required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("copywritingRequired", "Copywriting required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("bleedIncluded", "Bleed included?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("finishing", "Finishing", "multiselect", { options: ["Lamination", "Matte coating", "Gloss coating", "Spot UV", "Foil", "Rounded corners", "Folding", "Scoring", "Perforation", "Binding", "Other finishing", "None", "Not sure"] })
        ] },
        { title: "Deadline, delivery and contact", description: "Share timing, delivery and the best way to reach you.", icon: "calendar", fields: [
          f("requiredDate", "Required date", "date", { required: true }),
          f("deliveryMethod", "Pickup, delivery, shipping or mail", "multiselect", { options: ["Pickup", "Local delivery", "Shipping", "Direct-mail distribution"] }),
          f("mailingList", "Mailing addresses/list available?", "radio", { options: ["Yes", "No", "Not applicable", "Not sure"] })
        ].concat(contact) }
      ]
    },

    "signs-vehicle-graphics": {
      serviceName: "Signs and Vehicle Graphics",
      serviceKey: "signs-vehicle-graphics",
      accentClass: "quote-builder--graphics",
      headline: "Show us the surface. We will plan the right coverage.",
      description: "Share project type, surface dimensions, photos, artwork and installation details so we can recommend the right graphics solution.",
      cta: "Start a Graphics Quote",
      benefits: benefits,
      steps: [
        { title: "Project type", description: "Choose the graphic or sign project you need.", icon: "truck", fields: [
          f("projectType", "Project type", "multiselect", { required: true, options: ["Vehicle lettering", "Vehicle decals", "Partial vehicle wrap", "Full vehicle wrap", "Fleet branding", "Storefront graphics", "Wall graphics", "Floor graphics", "Coroplast sign", "Aluminum sign", "Banner", "Construction sign", "Real-estate sign", "Other"] }),
          f("vehicleYear", "Vehicle year", "text", { optional: true }), f("vehicleMake", "Vehicle make", "text", { optional: true }),
          f("vehicleModel", "Vehicle model", "text", { optional: true }), f("vehicleColour", "Vehicle colour", "text", { optional: true }),
          f("vehicleCount", "Number of vehicles", "number", { min: 1 }),
          f("sameDesign", "Same design on every vehicle?", "radio", { options: ["Yes", "No", "Not applicable", "Not sure"] })
        ] },
        { title: "Dimensions and surface", description: "Share approximate size, material and desired coverage.", icon: "measure", fields: [
          f("width", "Approximate width", "text"), f("height", "Approximate height", "text"),
          f("surfaceCount", "Number of surfaces or panels", "number", { min: 1 }),
          f("placement", "Indoor or outdoor", "radio", { options: ["Indoor", "Outdoor", "Both", "Not sure"] }),
          f("surfaceMaterial", "Surface material", "text"),
          f("surfaceShape", "Flat, curved or textured", "radio", { options: ["Flat", "Curved", "Textured", "Mixed", "Not sure"] }),
          f("existingGraphics", "Existing graphics present?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("removalRequired", "Existing graphics require removal?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("lifespan", "Desired lifespan", "select", { options: ["Not sure", "Short term", "1-2 years", "3-5 years", "Long term"] }),
          f("coverage", "Approximate coverage", "radio", { options: ["Lettering only", "Small decals", "Partial coverage", "Half wrap", "Full wrap", "Not sure"] })
        ] },
        { title: "Photos", description: "Upload photos so scale and access can be reviewed.", icon: "camera", guidance: "Take straight, well-lit photographs. Include the complete surface and avoid extreme camera angles.", fields: [
          upload("surfacePhotos", "Upload photos"),
          f("photoTypes", "Photo types included", "multiselect", { options: ["Wide photo", "Close-up photo", "Straight side views", "Front and rear vehicle photos", "Storefront or wall photos", "Multiple image upload"] }),
          f("photoNotes", "Photo notes", "textarea", { optional: true })
        ] },
        { title: "Artwork, material and installation", description: "Share artwork, material preferences and install needs.", icon: "palette", fields: [
          upload("logoArtwork", "Upload logo/artwork"),
          f("designRequired", "Design required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("brandColours", "Brand colours", "text", { optional: true }),
          f("textDetails", "Text or contact details to include", "textarea", { optional: true }),
          f("vinylFinish", "Preferred vinyl finish", "multiselect", { options: ["Gloss", "Matte", "Reflective", "Transparent", "Perforated window film", "Not sure"] }),
          f("installationRequired", "Installation required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("installationAddress", "Installation address", "text", { optional: true }),
          f("indoorInstall", "Indoor installation available?", "radio", { options: ["Yes", "No", "Not applicable", "Not sure"] }),
          f("overnight", "Vehicle can remain overnight?", "radio", { options: ["Yes", "No", "Not applicable", "Not sure"] }),
          f("removeOld", "Removal of previous graphics required?", "radio", { options: ["Yes", "No", "Not sure"] })
        ] },
        { title: "Deadline and contact", description: "Share timing, location and the best way to reach you.", icon: "calendar", fields: deadline.concat(contact) }
      ]
    },

    "vinyl-graphics": {
      serviceName: "Vinyl Graphics",
      serviceKey: "vinyl-graphics",
      accentClass: "quote-builder--graphics",
      headline: "Share the surface, size and artwork. We will plan the right vinyl solution.",
      description: "Tell us where the vinyl will go, the size, the surface condition, artwork status and timeline.",
      cta: "Request a Vinyl Graphics Quote",
      benefits: benefits,
      steps: [
        { title: "Application", description: "Choose where the vinyl graphics will be applied.", icon: "pin", fields: [f("application", "Application", "multiselect", { required: true, options: ["Vehicle", "Storefront", "Window", "Wall", "Door", "Floor", "Sign panel", "Equipment", "Other"] })] },
        { title: "Dimensions and quantity", description: "Share size, panel count and surface details.", icon: "measure", fields: [
          f("width", "Width", "text"), f("height", "Height", "text"), f("graphicCount", "Number of graphics", "number", { min: 1 }),
          f("panelCount", "Number of panels", "number", { min: 1 }), f("surfaceMaterial", "Surface material", "text"),
          f("environment", "Indoor or outdoor", "radio", { options: ["Indoor", "Outdoor", "Both", "Not sure"] }),
          f("surfaceShape", "Flat or curved", "radio", { options: ["Flat", "Curved", "Mixed", "Not sure"] }),
          f("useTerm", "Short-term or permanent use", "radio", { options: ["Short-term", "Permanent", "Not sure"] })
        ] },
        { title: "Photos", description: "Upload photos and describe existing conditions.", icon: "camera", fields: [
          upload("photos", "Multiple photo upload"),
          f("photoTypes", "Photo types included", "multiselect", { options: ["Wide view", "Straight view", "Close-up"] }),
          f("existingCondition", "Existing graphic condition", "textarea", { optional: true }),
          f("removalRequired", "Existing vinyl removal required?", "radio", { options: ["Yes", "No", "Not sure"] })
        ] },
        { title: "Artwork and coverage", description: "Share artwork status, finish and installation needs.", icon: "palette", fields: [
          upload("vectorLogo", "Upload vector logo"),
          f("artworkReady", "Artwork ready?", "radio", { options: ["Yes", "No", "Needs cleanup", "Not sure"] }),
          f("designRequired", "Design required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("coverage", "Coverage", "multiselect", { options: ["Lettering only", "Decals", "Large graphic area", "Full panel coverage"] }),
          f("finish", "Finish", "multiselect", { options: ["Gloss", "Matte", "Clear", "Reflective", "Metallic", "Perforated"] }),
          f("installationRequired", "Installation required?", "radio", { options: ["Yes", "No", "Not sure"] })
        ] },
        { title: "Deadline and contact", description: "Share timing, location and the best way to reach you.", icon: "calendar", fields: deadline.concat(contact) }
      ]
    },

    "glass-finishes": {
      serviceName: "Glass Finishes",
      serviceKey: "glass-finishes",
      accentClass: "quote-builder--glass",
      headline: "Measure the glass. Choose the finish. Get a clear quote.",
      description: "Share the glass area, measurements, photos, privacy goal and installation timing so we can recommend the right film.",
      cta: "Request a Glass-Film Quote",
      benefits: benefits,
      steps: [
        { title: "Glass project", description: "Tell us what kind of glass finish project this is.", icon: "grid", fields: [
          f("glassProject", "Glass project", "multiselect", { required: true, options: ["Office privacy glass", "Meeting room", "Storefront", "Entrance doors", "Interior partition", "Residential glass", "Decorative branding", "Safety markers", "Other"] }),
          f("buildingType", "Commercial or residential", "radio", { options: ["Commercial", "Residential", "Both", "Not sure"] }),
          f("glassFacing", "Indoor or exterior-facing glass", "radio", { options: ["Indoor", "Exterior-facing", "Both", "Not sure"] }),
          f("areas", "Number of rooms or areas", "number", { min: 1 })
        ] },
        { title: "Glass dimensions", description: "Add each panel size or provide an approximate square footage.", icon: "measure", fields: [
          f("glassPanels", "Glass panel measurements", "panel-rows"),
          f("panelCount", "Number of glass panels", "number", { min: 1 }),
          f("measurementUnit", "Measurement unit", "radio", { options: ["Inches", "Feet", "Centimetres"] }),
          f("frameType", "Frame type", "text", { optional: true }),
          f("squareFootage", "Total approximate square footage", "text", { optional: true }),
          f("doorsIncluded", "Glass doors included?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("multipleSizes", "Multiple panel sizes?", "radio", { options: ["Yes", "No", "Not sure"] })
        ] },
        { title: "Photos and site condition", description: "Upload room and glass photos so access can be reviewed.", icon: "camera", fields: [
          upload("glassPhotos", "Upload room-wide, straight glass and frame photos"),
          f("existingFilm", "Existing film present?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("filmRemoval", "Existing film removal required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("accessLimits", "Access limitations?", "textarea", { optional: true }),
          f("ladderLift", "Ladder or lift potentially required?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("floorLevel", "Installation-floor level", "text", { optional: true })
        ] },
        { title: "Privacy goal and finish", description: "Choose the privacy level and visual finish.", icon: "palette", fields: [
          f("privacyGoal", "Privacy goal", "multiselect", { required: true, options: ["Full privacy", "Eye-level privacy band", "Partial screening", "Decorative pattern", "Branding/logo", "Safety manifestation"] }),
          f("finishOptions", "Finish options", "multiselect", { options: ["Frosted", "Dusted", "Gradient", "Patterned", "Coloured", "Printed", "Not sure"] }),
          f("bandHeight", "Desired band height", "text", { optional: true }),
          upload("logoArtwork", "Logo/artwork upload"),
          f("preferredColour", "Preferred colour", "text", { optional: true }),
          f("patternReference", "Pattern reference", "textarea", { optional: true }),
          f("designHelp", "Design assistance required?", "radio", { options: ["Yes", "No", "Not sure"] })
        ] },
        { title: "Installation and contact", description: "Share location, timing and the best way to reach you.", icon: "calendar", fields: [
          f("installationLocation", "Installation location", "text", { required: true }),
          f("businessHours", "Business hours", "text", { optional: true }),
          f("afterHours", "After-hours installation preferred?", "radio", { options: ["Yes", "No", "Not sure"] })
        ].concat(deadline).concat([f("siteContact", "Site contact", "text", { optional: true })]).concat(contact) }
      ]
    },

    "digital-marketing": {
      serviceName: "Websites and Digital Marketing",
      serviceKey: "digital-marketing",
      accentClass: "quote-builder--digital",
      headline: "Get a tailored quote that drives results.",
      description: "Answer a few focused questions about your business, audience and goals. We will review your information and recommend the right digital solution.",
      cta: "Start My Digital Quote",
      benefits: [
        { title: "Tailored to your goals", text: "We focus on the outcome that matters most to your business.", icon: "target" },
        { title: "Strategic, not generic", text: "Recommendations are based on your audience, market and current presence.", icon: "map" },
        { title: "Clear scope and pricing", text: "You receive a practical recommendation with transparent next steps.", icon: "check" }
      ],
      steps: [
        { title: "Business offer", description: "Tell us what the business sells and where it operates.", icon: "briefcase", fields: [
          f("companyName", "Company name", "text", { required: true, autocomplete: "organization" }),
          f("businessCategory", "Business category", "text", { required: true }),
          f("mainService", "Main service or product", "text", { required: true }),
          f("mainOffer", "Main offer or promotion", "textarea", { optional: true }),
          f("yearsInBusiness", "Years in business", "text", { optional: true }),
          f("businessLocations", "Business locations", "text"),
          f("serviceArea", "Service area", "text"),
          f("difference", "What makes the business different?", "textarea", { optional: true }),
          f("competitors", "Main competitors", "textarea", { optional: true })
        ] },
        { title: "Target audience", description: "Define who should see and act on the message.", icon: "target", fields: [
          f("audienceTypes", "Audience types", "multiselect", { required: true, options: ["Residential customers", "Commercial customers", "Other businesses", "Property managers", "Contractors", "Local shoppers", "Specific industry", "Other"] }),
          f("mainCustomerType", "Main customer type", "text"),
          f("customerLocation", "Customer location", "text"),
          f("ageRange", "Customer age range", "text", { optional: true }),
          f("customerProblem", "Main customer problem", "textarea"),
          f("desiredAction", "Desired customer action", "radio", { required: true, options: ["Call", "Submit form", "Book appointment", "Visit location", "Purchase", "Request quote", "Other"] })
        ] },
        { title: "Current online presence", description: "Share links and what is or is not working now.", icon: "link", fields: [
          f("websiteUrl", "Current website URL", "url", { optional: true }),
          f("googleBusinessUrl", "Google Business Profile URL", "url", { optional: true }),
          f("facebookUrl", "Facebook URL", "url", { optional: true }),
          f("instagramUrl", "Instagram URL", "url", { optional: true }),
          f("linkedinUrl", "LinkedIn URL", "url", { optional: true }),
          f("landingPages", "Existing landing pages", "textarea", { optional: true }),
          f("adChannels", "Current advertising channels", "textarea", { optional: true }),
          f("analyticsAvailable", "Google Analytics available?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("googleAdsAvailable", "Google Ads account available?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("metaAdsAvailable", "Meta Ads account available?", "radio", { options: ["Yes", "No", "Not sure"] }),
          f("workingNow", "What is currently working?", "textarea", { optional: true }),
          f("notWorking", "What is not working?", "textarea", { optional: true })
        ] },
        { title: "Services, goals and budget", description: "Select the services, goals and budget range.", icon: "settings", fields: [
          f("services", "Services", "multiselect", { required: true, options: ["New website", "Website redesign", "Landing page", "Local SEO", "Google Business optimization", "Google Ads", "Meta advertising", "Social media creative", "Email marketing", "Direct-mail campaign", "Photography", "Copywriting", "Branding", "Not sure - recommend a plan"] }),
          f("goals", "Goals", "multiselect", { required: true, options: ["Get more leads", "Increase phone calls", "Increase quote requests", "Sell more products", "Improve local visibility", "Launch a new service", "Build brand awareness", "Improve website quality"] }),
          f("budget", "Budget range", "radio", { required: true, options: ["Under $1,000", "$1,000-$2,500", "$2,500-$5,000", "$5,000-$10,000", "More than $10,000", "Monthly marketing budget", "Not sure"] })
        ] },
        { title: "Brand assets, timeline and contact", description: "Upload useful files and tell us when you want to launch.", icon: "calendar", fields: [
          upload("brandFiles", "Upload logo, brand guide or useful photos"),
          f("brandColours", "Brand colours", "text", { optional: true }),
          f("copyAvailable", "Existing copy available?", "radio", { options: ["Yes", "No", "Some", "Not sure"] }),
          f("preferredLaunchDate", "Preferred launch date", "date"),
          f("deadlineFlexible", "Is the deadline flexible?", "radio", { options: ["Yes", "No", "Not sure"] })
        ].concat(contact) }
      ]
    },

    generic: {
      serviceName: "Affinity Creative Project",
      serviceKey: "generic",
      accentClass: "quote-builder--generic",
      headline: "Start with the project details.",
      description: "Answer a few focused questions so Affinity Creative can recommend the right next step.",
      cta: "Start My Quote",
      benefits: benefits,
      steps: [
        { title: "Project or service type", description: "Tell us what you need.", icon: "briefcase", fields: [f("projectType", "Project or service type", "textarea", { required: true })] },
        { title: "Scale", description: "Share quantity, dimensions or project scale.", icon: "measure", fields: [f("projectScale", "Quantity, dimensions or project scale", "textarea", { required: true })] },
        { title: "Materials", description: "Upload artwork, photos or existing materials.", icon: "upload", fields: [upload("materials", "Artwork, photos or existing materials"), f("materialNotes", "Notes", "textarea", { optional: true })] },
        { title: "Specifications", description: "Share requested options and details.", icon: "settings", fields: [f("specifications", "Specifications and requested options", "textarea", { required: true })] },
        { title: "Deadline and contact", description: "Share timing, location and the best way to reach you.", icon: "calendar", fields: deadline.concat(contact) }
      ]
    }
  };

  window.AffinityQuoteConfigurations = {
    endpoint: "/api/quote-request.php",
    maxFiles: 5,
    maxFileSize: 8 * 1024 * 1024,
    maxTotalFileSize: 20 * 1024 * 1024,
    allowedExtensions: ["jpg", "jpeg", "png", "webp", "pdf", "svg", "ai", "eps", "zip"],
    routeMap: {
      "/apparel/": "apparel",
      "/embroidery/": "embroidery",
      "/business-print/": "business-print",
      "/signs-vehicle-graphics/": "signs-vehicle-graphics",
      "/vinyl-graphics/": "vinyl-graphics",
      "/glass-finishes/": "glass-finishes",
      "/digital-marketing/": "digital-marketing"
    },
    configs: configs
  };
})(window);
