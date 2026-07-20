(function (window, document) {
  "use strict";

  var rootConfig = window.AffinityQuoteConfigurations;
  if (!rootConfig || !rootConfig.configs) return;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizePath(path) {
    var clean = path || "/";
    if (clean.length > 1 && clean.charAt(clean.length - 1) !== "/") clean += "/";
    return clean;
  }

  function inferServiceKey(element) {
    var explicit = element.getAttribute("data-service-key");
    if (explicit && rootConfig.configs[explicit]) return explicit;
    return rootConfig.routeMap[normalizePath(window.location.pathname)] || "generic";
  }

  function formatBytes(bytes) {
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    if (bytes >= 1024) return Math.ceil(bytes / 1024) + " KB";
    return bytes + " B";
  }

  function icon(name) {
    var paths = {
      check: '<path d="M20 6 9 17l-5-5"></path>',
      list: '<path d="M8 6h13"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path>',
      support: '<path d="M3 11a9 9 0 0 1 18 0"></path><path d="M21 13v3a2 2 0 0 1-2 2h-1"></path><path d="M3 13v3a2 2 0 0 0 2 2h1"></path><path d="M12 19v2"></path>',
      shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47A2 2 0 0 0 4.83 11H6v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9h1.17a2 2 0 0 0 1.97-1.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>',
      hash: '<path d="M4 9h16"></path><path d="M4 15h16"></path><path d="M10 3 8 21"></path><path d="m16 3-2 18"></path>',
      palette: '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 22a10 10 0 1 1 10-10 3.5 3.5 0 0 1-3.5 3.5H17a2 2 0 0 0-2 2c0 1.5-1.5 4.5-3 4.5z"></path>',
      pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle>',
      calendar: '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>',
      file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path>',
      measure: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0z"></path><path d="m14.5 12.5 2-2"></path><path d="m11.5 9.5 2-2"></path><path d="m8.5 6.5 2-2"></path>',
      truck: '<path d="M14 18V6a2 2 0 0 0-2-2H3v14h2"></path><path d="M15 18H9"></path><path d="M19 18h2v-6l-3-5h-4"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>',
      camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"></path><circle cx="12" cy="13" r="3"></circle>',
      grid: '<rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>',
      target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
      map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"></path><path d="M9 3v15"></path><path d="M15 6v15"></path>',
      briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path><path d="M2 12h20"></path>',
      link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
      settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>',
      upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m17 8-5-5-5 5"></path><path d="M12 3v12"></path>'
    };
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.check) + "</svg>";
  }

  function sendAnalytics(eventName, serviceKey, stepNumber) {
    if (!window.dataLayer || !Array.isArray(window.dataLayer)) return;
    window.dataLayer.push({
      event: eventName,
      service_key: serviceKey,
      step_number: stepNumber || undefined,
      page_path: window.location.pathname
    });
  }

  function QuoteBuilder(element, key, config) {
    this.element = element;
    this.key = key;
    this.config = config;
    this.storageKey = "affinityQuoteDraft:" + key;
    this.state = {
      started: false,
      active: 0,
      completed: [],
      answers: {},
      files: [],
      errors: {},
      status: "",
      sending: false,
      success: null,
      startedAt: Date.now()
    };
    this.loadDraft();
    this.bind();
    this.render();
  }

  QuoteBuilder.prototype.loadDraft = function () {
    try {
      var saved = JSON.parse(window.localStorage.getItem(this.storageKey) || "null");
      if (!saved || typeof saved !== "object") return;
      this.state.started = Boolean(saved.started);
      this.state.active = Number(saved.active) || 0;
      this.state.completed = Array.isArray(saved.completed) ? saved.completed : [];
      this.state.answers = saved.answers && typeof saved.answers === "object" ? saved.answers : {};
      this.state.startedAt = Number(saved.startedAt) || Date.now();
    } catch (error) {}
  };

  QuoteBuilder.prototype.saveDraft = function () {
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify({
        started: this.state.started,
        active: this.state.active,
        completed: this.state.completed,
        answers: this.state.answers,
        startedAt: this.state.startedAt
      }));
    } catch (error) {}
  };

  QuoteBuilder.prototype.clearDraft = function () {
    try { window.localStorage.removeItem(this.storageKey); } catch (error) {}
  };

  QuoteBuilder.prototype.bind = function () {
    var self = this;
    this.element.addEventListener("click", function (event) {
      var button = event.target.closest("[data-quote-action]");
      if (!button || !self.element.contains(button)) return;
      event.preventDefault();
      self.handleAction(button);
    });
    this.element.addEventListener("input", function (event) {
      self.handleInput(event.target, false);
    });
    this.element.addEventListener("change", function (event) {
      self.handleInput(event.target, true);
    });
  };

  QuoteBuilder.prototype.handleAction = function (button) {
    var action = button.getAttribute("data-quote-action");
    var step = Number(button.getAttribute("data-step"));
    if (action === "start") this.start();
    if (action === "go-step") this.goStep(step);
    if (action === "next") this.next();
    if (action === "back") this.back();
    if (action === "clear") this.clear();
    if (action === "submit") this.submit();
    if (action === "another") this.clear(true);
    if (action === "remove-file") this.removeFile(Number(button.getAttribute("data-file-index")));
    if (action === "add-panel-row") this.addPanelRow(button.getAttribute("data-field-id"));
    if (action === "remove-panel-row") this.removePanelRow(button.getAttribute("data-field-id"), Number(button.getAttribute("data-row-index")));
  };

  QuoteBuilder.prototype.start = function () {
    this.state.started = true;
    this.state.success = null;
    this.state.startedAt = this.state.startedAt || Date.now();
    this.saveDraft();
    sendAnalytics("quote_builder_started", this.key, 1);
    this.render(true);
  };

  QuoteBuilder.prototype.goStep = function (step) {
    if (Number.isNaN(step)) return;
    if (!this.state.started) {
      if (step !== 0) return;
      this.start();
      return;
    }
    if (step > 0 && this.state.completed.indexOf(step - 1) === -1 && step !== this.state.active) return;
    this.state.active = Math.max(0, Math.min(step, this.config.steps.length - 1));
    this.state.errors = {};
    this.saveDraft();
    this.render(true);
  };

  QuoteBuilder.prototype.next = function () {
    if (!this.validateStep(this.state.active)) {
      this.render(true);
      return;
    }
    if (this.state.completed.indexOf(this.state.active) === -1) this.state.completed.push(this.state.active);
    sendAnalytics("quote_step_completed", this.key, this.state.active + 1);
    if (this.state.active < this.config.steps.length - 1) this.state.active += 1;
    this.saveDraft();
    this.render(true);
  };

  QuoteBuilder.prototype.back = function () {
    this.state.active = Math.max(0, this.state.active - 1);
    this.state.errors = {};
    this.saveDraft();
    this.render(true);
  };

  QuoteBuilder.prototype.clear = function (keepStarted) {
    this.state.started = Boolean(keepStarted);
    this.state.active = 0;
    this.state.completed = [];
    this.state.answers = {};
    this.state.files = [];
    this.state.errors = {};
    this.state.status = "";
    this.state.sending = false;
    this.state.success = null;
    this.state.startedAt = Date.now();
    this.clearDraft();
    this.render(true);
  };

  QuoteBuilder.prototype.getField = function (id) {
    for (var i = 0; i < this.config.steps.length; i += 1) {
      for (var j = 0; j < this.config.steps[i].fields.length; j += 1) {
        if (this.config.steps[i].fields[j].id === id) return this.config.steps[i].fields[j];
      }
    }
    return null;
  };

  QuoteBuilder.prototype.handleInput = function (target, isChange) {
    if (!target || !target.getAttribute) return;
    var id = target.getAttribute("data-field-id");
    if (!id) return;
    var field = this.getField(id);
    if (!field) return;
    if (field.type === "file" && isChange) {
      this.addFiles(target.files, field);
      target.value = "";
      return;
    }
    if (field.type === "panel-rows") {
      this.updatePanelInput(target, field);
      return;
    }
    if (field.type === "size-grid") {
      var size = target.getAttribute("data-size");
      var current = this.state.answers[id] || {};
      current[size] = target.value;
      this.state.answers[id] = current;
      this.saveDraft();
      this.refreshSummary();
      return;
    }
    if (field.type === "multiselect") {
      var selected = Array.prototype.slice.call(this.element.querySelectorAll('[data-field-id="' + id + '"]:checked')).map(function (input) { return input.value; });
      this.state.answers[id] = selected;
    } else if (field.type === "checkbox") {
      this.state.answers[id] = target.checked ? "Yes" : "";
    } else {
      this.state.answers[id] = target.value;
    }
    if (this.state.errors[id]) delete this.state.errors[id];
    this.saveDraft();
    this.refreshSummary();
  };

  QuoteBuilder.prototype.addFiles = function (fileList, field) {
    var files = Array.prototype.slice.call(fileList || []);
    var total = this.state.files.reduce(function (sum, item) { return sum + item.file.size; }, 0);
    var messages = [];
    for (var i = 0; i < files.length; i += 1) {
      var file = files[i];
      var ext = (file.name.split(".").pop() || "").toLowerCase();
      if (this.state.files.length >= rootConfig.maxFiles) {
        messages.push("Maximum " + rootConfig.maxFiles + " files allowed.");
        break;
      }
      if (rootConfig.allowedExtensions.indexOf(ext) === -1) {
        messages.push(file.name + " is not an accepted file type.");
        continue;
      }
      if (file.size > rootConfig.maxFileSize) {
        messages.push(file.name + " is larger than " + formatBytes(rootConfig.maxFileSize) + ".");
        continue;
      }
      if (total + file.size > rootConfig.maxTotalFileSize) {
        messages.push("Total uploads cannot exceed " + formatBytes(rootConfig.maxTotalFileSize) + ".");
        break;
      }
      total += file.size;
      this.state.files.push({ file: file, fieldId: field.id, label: field.label });
    }
    this.state.status = messages.join(" ");
    this.render(true);
  };

  QuoteBuilder.prototype.removeFile = function (index) {
    this.state.files.splice(index, 1);
    this.render(true);
  };

  QuoteBuilder.prototype.updatePanelInput = function (target, field) {
    var rows = this.state.answers[field.id] || [{ width: "", height: "", quantity: "1" }];
    var index = Number(target.getAttribute("data-row-index"));
    var key = target.getAttribute("data-panel-key");
    if (!rows[index]) rows[index] = { width: "", height: "", quantity: "1" };
    rows[index][key] = target.value;
    this.state.answers[field.id] = rows;
    this.saveDraft();
  };

  QuoteBuilder.prototype.addPanelRow = function (id) {
    var rows = this.state.answers[id] || [{ width: "", height: "", quantity: "1" }];
    rows.push({ width: "", height: "", quantity: "1" });
    this.state.answers[id] = rows;
    this.saveDraft();
    this.render(true);
  };

  QuoteBuilder.prototype.removePanelRow = function (id, index) {
    var rows = this.state.answers[id] || [];
    rows.splice(index, 1);
    if (!rows.length) rows.push({ width: "", height: "", quantity: "1" });
    this.state.answers[id] = rows;
    this.saveDraft();
    this.render(true);
  };

  QuoteBuilder.prototype.validateStep = function (stepIndex) {
    var step = this.config.steps[stepIndex];
    var errors = {};
    for (var i = 0; i < step.fields.length; i += 1) {
      var field = step.fields[i];
      var value = this.state.answers[field.id];
      if (field.required && !this.hasValue(value)) errors[field.id] = field.label + " is required.";
      if (field.type === "email" && value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(value))) errors[field.id] = "Enter a valid email address.";
      if (field.type === "tel" && value && String(value).replace(/\D/g, "").length < 7) errors[field.id] = "Enter a valid phone number.";
      if (field.type === "date" && field.required && value && Number.isNaN(Date.parse(String(value)))) errors[field.id] = "Enter a valid date.";
    }
    this.state.errors = errors;
    return Object.keys(errors).length === 0;
  };

  QuoteBuilder.prototype.hasValue = function (value) {
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object") {
      return Object.keys(value).some(function (key) {
        var item = value[key];
        if (item && typeof item === "object") return Object.keys(item).some(function (sub) { return String(item[sub] || "").trim() !== ""; });
        return String(item || "").trim() !== "";
      });
    }
    return String(value || "").trim() !== "";
  };

  QuoteBuilder.prototype.render = function (focusPanel) {
    this.element.innerHTML =
      '<div class="container quote-builder ' + escapeHtml(this.config.accentClass || "") + '">' +
        this.renderIntro() +
        '<div class="quote-builder__panel">' + this.renderPanel() + "</div>" +
      "</div>";
    if (focusPanel) {
      var panel = this.element.querySelector(".quote-builder__panel");
      if (panel) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  QuoteBuilder.prototype.renderIntro = function () {
    var benefitsHtml = (this.config.benefits || benefits).map(function (item) {
      return '<div class="quote-builder__benefit"><span class="quote-builder__benefit-icon">' + icon(item.icon) + '</span><span class="quote-builder__benefit-copy"><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.text) + '</span></span></div>';
    }).join("");
    return '<div class="quote-builder__intro">' +
      '<p class="quote-builder__eyebrow">Ready for a useful estimate?</p>' +
      '<h2>' + this.renderHeadline() + '</h2>' +
      '<p>' + escapeHtml(this.config.description) + '</p>' +
      '<div class="quote-builder__benefits">' + benefitsHtml + '</div>' +
      '<button class="quote-builder__cta" type="button" data-quote-action="start">' + escapeHtml(this.config.cta || "Start My Quote") + '<span aria-hidden="true">↗</span></button>' +
      '<span class="quote-builder__reassurance">Takes less than 2 minutes - No obligation</span>' +
    '</div>';
  };

  QuoteBuilder.prototype.renderHeadline = function () {
    if (Array.isArray(this.config.headlineLines) && this.config.headlineLines.length) {
      return this.config.headlineLines.map(function (line) {
        return '<span>' + escapeHtml(line) + '</span>';
      }).join("");
    }
    return escapeHtml(this.config.headline);
  };

  QuoteBuilder.prototype.renderPanel = function () {
    if (this.state.success) return this.renderSuccess();
    return '<form class="quote-builder__form" novalidate>' +
      '<input class="quote-visually-hidden" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="quote-builder__header"><div><h3>Guided Quote Builder</h3><p class="quote-status" aria-live="polite">' + escapeHtml(this.state.status) + '</p></div><span class="quote-builder__step-count">Step ' + (this.state.active + 1) + ' of ' + this.config.steps.length + '</span></div>' +
      this.renderProgress() +
      this.renderStepRows() +
      (this.state.started ? this.renderActiveStep() : "") +
      '</form>' +
      this.renderTrust();
  };

  QuoteBuilder.prototype.renderProgress = function () {
    var self = this;
    return '<div class="quote-progress" aria-label="Quote progress">' + this.config.steps.map(function (step, index) {
      var complete = self.state.completed.indexOf(index) !== -1;
      var current = self.state.started && self.state.active === index;
      return '<div class="quote-progress__item ' + (complete ? "is-complete " : "") + (current ? "is-current" : "") + '">' +
        '<span class="quote-progress__dot">' + (complete ? "✓" : String(index + 1)) + '</span>' +
        '<span class="quote-progress__label">' + escapeHtml(step.title) + '</span>' +
      '</div>';
    }).join("") + '</div>';
  };

  QuoteBuilder.prototype.renderStepRows = function () {
    var self = this;
    return '<div class="quote-step-list">' + this.config.steps.map(function (step, index) {
      var unlocked = index === 0 || self.state.completed.indexOf(index - 1) !== -1 || self.state.completed.indexOf(index) !== -1 || self.state.active === index;
      var active = self.state.started && self.state.active === index;
      return '<button class="quote-step-row ' + (active ? "is-active" : "") + '" type="button" data-quote-action="go-step" data-step="' + index + '" aria-expanded="' + (active ? "true" : "false") + '"' + (unlocked ? "" : " disabled") + '>' +
        '<span class="quote-step-row__icon">' + icon(step.icon) + '</span>' +
        '<span class="quote-step-row__copy"><strong>' + escapeHtml(step.title) + '</strong><span>' + escapeHtml(step.description) + '</span></span>' +
        '<span class="quote-step-row__chevron" aria-hidden="true">' + (self.state.completed.indexOf(index) !== -1 ? "✓" : "›") + '</span>' +
      '</button>';
    }).join("") + '</div>';
  };

  QuoteBuilder.prototype.renderActiveStep = function () {
    var step = this.config.steps[this.state.active];
    return '<section class="quote-step-panel" aria-labelledby="quote-step-title">' +
      '<div class="quote-step-panel__heading"><p>Step ' + (this.state.active + 1) + ' of ' + this.config.steps.length + '</p><h4 id="quote-step-title">' + escapeHtml(step.title) + '</h4><p>' + escapeHtml(step.description) + '</p></div>' +
      (step.guidance ? '<p class="quote-guidance">' + escapeHtml(step.guidance) + '</p>' : "") +
      '<div class="quote-fields">' + step.fields.map(this.renderField.bind(this)).join("") + '</div>' +
      (this.state.active === this.config.steps.length - 1 ? this.renderSummary() : "") +
      this.renderActions() +
    '</section>';
  };

  QuoteBuilder.prototype.renderField = function (field) {
    if (field.type === "multiselect" || field.type === "radio") return this.renderChoiceField(field);
    if (field.type === "checkbox") return this.renderCheckbox(field);
    if (field.type === "textarea") return this.renderTextarea(field);
    if (field.type === "select") return this.renderSelect(field);
    if (field.type === "file") return this.renderFile(field);
    if (field.type === "size-grid") return this.renderSizeGrid(field);
    if (field.type === "panel-rows") return this.renderPanelRows(field);
    return this.renderInput(field);
  };

  QuoteBuilder.prototype.renderLabel = function (field) {
    return escapeHtml(field.label) + (field.required ? ' <span class="quote-required">*</span>' : field.optional ? ' <span class="quote-field__help">(optional)</span>' : "");
  };

  QuoteBuilder.prototype.renderError = function (field) {
    return this.state.errors[field.id] ? '<p class="quote-error" id="quote-error-' + escapeHtml(field.id) + '">' + escapeHtml(this.state.errors[field.id]) + '</p>' : "";
  };

  QuoteBuilder.prototype.renderInput = function (field) {
    var value = this.state.answers[field.id] || "";
    return '<div class="quote-field"><label for="quote-' + escapeHtml(field.id) + '">' + this.renderLabel(field) + '</label><input id="quote-' + escapeHtml(field.id) + '" data-field-id="' + escapeHtml(field.id) + '" type="' + escapeHtml(field.type || "text") + '" value="' + escapeHtml(value) + '"' + (field.required ? " required" : "") + (field.autocomplete ? ' autocomplete="' + escapeHtml(field.autocomplete) + '"' : "") + (field.min ? ' min="' + escapeHtml(field.min) + '"' : "") + '>' + (field.help ? '<p class="quote-field__help">' + escapeHtml(field.help) + '</p>' : "") + this.renderError(field) + '</div>';
  };

  QuoteBuilder.prototype.renderTextarea = function (field) {
    var value = this.state.answers[field.id] || "";
    return '<div class="quote-field"><label for="quote-' + escapeHtml(field.id) + '">' + this.renderLabel(field) + '</label><textarea id="quote-' + escapeHtml(field.id) + '" data-field-id="' + escapeHtml(field.id) + '"' + (field.required ? " required" : "") + '>' + escapeHtml(value) + '</textarea>' + this.renderError(field) + '</div>';
  };

  QuoteBuilder.prototype.renderSelect = function (field) {
    var value = this.state.answers[field.id] || "";
    return '<div class="quote-field"><label for="quote-' + escapeHtml(field.id) + '">' + this.renderLabel(field) + '</label><select id="quote-' + escapeHtml(field.id) + '" data-field-id="' + escapeHtml(field.id) + '">' +
      '<option value="">Choose one</option>' + (field.options || []).map(function (option) { return '<option value="' + escapeHtml(option) + '"' + (value === option ? " selected" : "") + '>' + escapeHtml(option) + '</option>'; }).join("") +
      '</select>' + this.renderError(field) + '</div>';
  };

  QuoteBuilder.prototype.renderChoiceField = function (field) {
    var value = this.state.answers[field.id] || (field.type === "multiselect" ? [] : "");
    var inputType = field.type === "multiselect" ? "checkbox" : "radio";
    var choices = (field.options || []).map(function (option) {
      var checked = Array.isArray(value) ? value.indexOf(option) !== -1 : value === option;
      return '<label class="quote-choice"><input data-field-id="' + escapeHtml(field.id) + '" type="' + inputType + '" name="quote-' + escapeHtml(field.id) + '" value="' + escapeHtml(option) + '"' + (checked ? " checked" : "") + '> <span>' + escapeHtml(option) + '</span></label>';
    }).join("");
    return '<fieldset class="quote-field"><legend>' + this.renderLabel(field) + '</legend><div class="quote-choices">' + choices + '</div>' + this.renderError(field) + '</fieldset>';
  };

  QuoteBuilder.prototype.renderCheckbox = function (field) {
    var checked = this.state.answers[field.id] === "Yes";
    return '<div class="quote-field"><label class="quote-choice"><input data-field-id="' + escapeHtml(field.id) + '" type="checkbox" value="Yes"' + (checked ? " checked" : "") + (field.required ? " required" : "") + '> <span>' + this.renderLabel(field) + '</span></label>' + this.renderError(field) + '</div>';
  };

  QuoteBuilder.prototype.renderFile = function (field) {
    var fileList = this.state.files.map(function (item, index) {
      return '<div class="quote-file-item"><span><strong>' + escapeHtml(item.file.name) + '</strong><br><small>' + escapeHtml(item.label) + ' - ' + formatBytes(item.file.size) + '</small></span><button class="quote-link-button" type="button" data-quote-action="remove-file" data-file-index="' + index + '">Remove</button></div>';
    }).join("");
    return '<div class="quote-field"><label for="quote-' + escapeHtml(field.id) + '">' + this.renderLabel(field) + '</label><div class="quote-file-input"><input id="quote-' + escapeHtml(field.id) + '" data-field-id="' + escapeHtml(field.id) + '" type="file" accept="' + escapeHtml(field.accept || "") + '"' + (field.multiple ? " multiple" : "") + '><p class="quote-field__help">' + escapeHtml(field.help || "") + '</p></div>' + (fileList ? '<div class="quote-file-list">' + fileList + '</div>' : "") + this.renderError(field) + '</div>';
  };

  QuoteBuilder.prototype.renderSizeGrid = function (field) {
    var values = this.state.answers[field.id] || {};
    var cells = (field.sizes || []).map(function (size) {
      return '<label class="quote-size-cell"><span>' + escapeHtml(size) + '</span><input data-field-id="' + escapeHtml(field.id) + '" data-size="' + escapeHtml(size) + '" type="number" min="0" value="' + escapeHtml(values[size] || "") + '"></label>';
    }).join("");
    return '<fieldset class="quote-field"><legend>' + this.renderLabel(field) + '</legend><div class="quote-size-grid">' + cells + '</div>' + this.renderError(field) + '</fieldset>';
  };

  QuoteBuilder.prototype.renderPanelRows = function (field) {
    var rows = this.state.answers[field.id] || [{ width: "", height: "", quantity: "1" }];
    var html = rows.map(function (row, index) {
      return '<div class="quote-panel-row"><label>Width<input data-field-id="' + escapeHtml(field.id) + '" data-row-index="' + index + '" data-panel-key="width" type="text" value="' + escapeHtml(row.width || "") + '"></label><label>Height<input data-field-id="' + escapeHtml(field.id) + '" data-row-index="' + index + '" data-panel-key="height" type="text" value="' + escapeHtml(row.height || "") + '"></label><label>Qty<input data-field-id="' + escapeHtml(field.id) + '" data-row-index="' + index + '" data-panel-key="quantity" type="number" min="1" value="' + escapeHtml(row.quantity || "1") + '"></label><button class="quote-link-button" type="button" data-quote-action="remove-panel-row" data-field-id="' + escapeHtml(field.id) + '" data-row-index="' + index + '">Remove</button></div>';
    }).join("");
    return '<fieldset class="quote-field"><legend>' + this.renderLabel(field) + '</legend><div class="quote-panel-rows">' + html + '</div><button class="quote-button" type="button" data-quote-action="add-panel-row" data-field-id="' + escapeHtml(field.id) + '">Add panel row</button>' + this.renderError(field) + '</fieldset>';
  };

  QuoteBuilder.prototype.renderActions = function () {
    var isLast = this.state.active === this.config.steps.length - 1;
    return '<div class="quote-actions"><button class="quote-link-button" type="button" data-quote-action="clear">Clear form</button><div class="quote-actions__group">' +
      (this.state.active > 0 ? '<button class="quote-button" type="button" data-quote-action="back">Back</button>' : "") +
      (isLast ? '<button class="quote-button quote-button--primary" type="button" data-quote-action="submit"' + (this.state.sending ? " disabled" : "") + '>' + (this.state.sending ? "Sending request..." : "Send My Quote Request") + '</button>' : '<button class="quote-button quote-button--primary" type="button" data-quote-action="next">Continue</button>') +
      '</div></div>';
  };

  QuoteBuilder.prototype.valueToText = function (value) {
    if (Array.isArray(value)) return value.length ? value.join(", ") : "Not answered";
    if (value && typeof value === "object") {
      var parts = [];
      Object.keys(value).forEach(function (key) {
        var item = value[key];
        if (item && typeof item === "object") {
          parts.push(Object.keys(item).map(function (sub) { return sub + ": " + (item[sub] || "-"); }).join(", "));
        } else if (String(item || "").trim() !== "") {
          parts.push(key + ": " + item);
        }
      });
      return parts.length ? parts.join("; ") : "Not answered";
    }
    return String(value || "").trim() || "Not answered";
  };

  QuoteBuilder.prototype.getSummaryData = function () {
    var self = this;
    return this.config.steps.map(function (step, stepIndex) {
      return {
        title: step.title,
        step: stepIndex + 1,
        fields: step.fields.map(function (field) {
          return { id: field.id, label: field.label, value: self.state.answers[field.id] || "" };
        })
      };
    });
  };

  QuoteBuilder.prototype.renderSummary = function () {
    var self = this;
    var steps = this.getSummaryData().map(function (step, index) {
      var rows = step.fields.map(function (field) {
        return '<div><dt>' + escapeHtml(field.label) + '</dt><dd>' + escapeHtml(self.valueToText(field.value)) + '</dd></div>';
      }).join("");
      return '<article class="quote-summary__step"><div class="quote-summary__title"><strong>' + escapeHtml(step.title) + '</strong><button class="quote-link-button" type="button" data-quote-action="go-step" data-step="' + index + '">Edit</button></div><dl>' + rows + '</dl></article>';
    }).join("");
    var fileSummary = this.state.files.length ? '<article class="quote-summary__step"><div class="quote-summary__title"><strong>Uploaded files</strong></div><dl>' + this.state.files.map(function (item) { return '<div><dt>' + escapeHtml(item.label) + '</dt><dd>' + escapeHtml(item.file.name) + ' (' + formatBytes(item.file.size) + ')</dd></div>'; }).join("") + '</dl></article>' : "";
    return '<section class="quote-summary" aria-label="Review your quote request"><h4>Review your request before sending.</h4>' + steps + fileSummary + '</section>';
  };

  QuoteBuilder.prototype.refreshSummary = function () {
    if (this.state.active !== this.config.steps.length - 1) return;
    var summary = this.element.querySelector(".quote-summary");
    if (summary) summary.outerHTML = this.renderSummary();
  };

  QuoteBuilder.prototype.renderTrust = function () {
    var items = [
      ["Quick response", "Custom quote within one business day", "calendar"],
      ["No obligation", "Review the recommendation without pressure", "check"],
      ["Real local support", "A member of the Affinity Creative team will respond", "support"]
    ];
    return '<div class="quote-trust">' + items.map(function (item) {
      return '<div class="quote-trust__item"><span class="quote-trust__icon">' + icon(item[2]) + '</span><span><strong>' + escapeHtml(item[0]) + '</strong><span>' + escapeHtml(item[1]) + '</span></span></div>';
    }).join("") + '</div>';
  };

  QuoteBuilder.prototype.renderSuccess = function () {
    return '<div class="quote-success" aria-live="polite"><span class="quote-success__badge">✓</span><h3>Thank you.</h3><p>Your quote request has been received. We will respond within one business day.</p><p><strong>Request reference:</strong> ' + escapeHtml(this.state.success.requestId) + '</p><button class="quote-button quote-button--primary" type="button" data-quote-action="another">Submit Another Request</button></div>';
  };

  QuoteBuilder.prototype.buildPayload = function () {
    var data = new FormData();
    var summary = this.getSummaryData();
    var answers = this.state.answers;
    data.append("serviceKey", this.key);
    data.append("serviceName", this.config.serviceName);
    data.append("sourcePage", window.location.pathname);
    data.append("formStartedAt", String(Math.floor(this.state.startedAt / 1000)));
    data.append("answers", JSON.stringify(summary));
    data.append("uploadedFileCount", String(this.state.files.length));
    ["fullName", "companyName", "email", "phone", "preferredContact", "consent", "requiredDate", "budget", "location", "additionalNotes"].forEach(function (id) {
      if (answers[id] != null) data.append(id, Array.isArray(answers[id]) ? answers[id].join(", ") : String(answers[id]));
    });
    var honeypot = this.element.querySelector('input[name="website"]');
    data.append("website", honeypot ? honeypot.value : "");
    this.state.files.forEach(function (item) {
      data.append("files[]", item.file, item.file.name);
      data.append("fileLabels[]", item.label);
    });
    return data;
  };

  QuoteBuilder.prototype.submit = function () {
    var self = this;
    if (!this.validateStep(this.state.active)) {
      this.render(true);
      return;
    }
    this.state.sending = true;
    this.state.status = "Sending request...";
    this.render(true);
    sendAnalytics("quote_builder_submitted", this.key, this.state.active + 1);
    fetch(rootConfig.endpoint, {
      method: "POST",
      body: this.buildPayload(),
      headers: { "Accept": "application/json" },
      credentials: "same-origin"
    })
      .then(function (response) {
        return response.json().catch(function () {
          return { ok: false, message: "The server returned an unreadable response." };
        }).then(function (json) {
          if (!response.ok && json.ok !== true) throw json;
          return json;
        });
      })
      .then(function (json) {
        if (!json.ok) throw json;
        self.clearDraft();
        self.state.success = { requestId: json.requestId || "AC-" + Date.now() };
        self.state.sending = false;
        self.state.status = "";
        sendAnalytics("quote_builder_success", self.key, self.state.active + 1);
        self.render(true);
      })
      .catch(function (error) {
        self.state.sending = false;
        self.state.status = (error && error.message) ? error.message : "The request could not be sent. Please try again or email info@affinitycreative.ca.";
        sendAnalytics("quote_builder_error", self.key, self.state.active + 1);
        self.render(true);
      });
  };

  function mount(element) {
    if (!element || element.getAttribute("data-quote-mounted") === "true") return;
    var serviceKey = inferServiceKey(element);
    var config = rootConfig.configs[serviceKey] || rootConfig.configs.generic;
    var section = element;
    if (!element.hasAttribute("data-affinity-quote-builder")) {
      section = document.createElement("section");
      section.className = "quote-builder-section";
      section.id = "quote-builder";
      section.setAttribute("data-affinity-quote-builder", "");
      element.replaceWith(section);
    }
    section.setAttribute("data-quote-mounted", "true");
    section.setAttribute("data-service-key", serviceKey);
    section.setAttribute("aria-label", "Guided quote builder");
    new QuoteBuilder(section, serviceKey, config);
  }

  function mountAll() {
    var targets = Array.prototype.slice.call(document.querySelectorAll("[data-affinity-quote-builder], .project-brief"));
    targets.forEach(function (target) {
      if (!target.closest(".quote-builder-section")) mount(target);
    });
  }

  function start() {
    window.setTimeout(function () {
      mountAll();
      var observer = new MutationObserver(function () { mountAll(); });
      observer.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(function () { observer.disconnect(); }, 5000);
    }, 80);
  }

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }
})(window, document);
