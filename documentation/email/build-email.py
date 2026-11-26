#!/usr/bin/env python3
"""Builds documentation/email/workwear-winter-2026.html (paste into Brevo > HTML editor).
Usage: python3 documentation/email/build-email.py [base_url_for_images]"""
import sys, pathlib
BASE = (sys.argv[1] if len(sys.argv) > 1 else 'https://affinitycreative.ca').rstrip('/')
LAND = 'https://affinitycreative.ca/workwear/?utm_source=brevo&amp;utm_medium=email&amp;utm_campaign=workwear_winter_2026'
def link(content): return f'{LAND}&amp;utm_content={content}'
WA = 'https://wa.me/14373131510?text=Hi%20Affinity%20Creative!%20I%27m%20interested%20in%20custom%20workwear%20for%20my%20company.%20Could%20you%20provide%20more%20information%20and%20a%20quote%3F'

def tile(img, name, price, alt, content):
    return f"""<td class="tile" width="25%" valign="top" style="padding:4px;">
            <a href="{link(content)}" target="_blank" style="text-decoration:none;color:#11110f;display:block;">
              <img src="{BASE}/images/email/workwear-{img}-email.jpg" width="129" alt="{alt}" style="display:block;width:100%;height:auto;border:0;border-radius:10px;">
              <span style="display:block;font:700 13px/1.3 Arial,Helvetica,sans-serif;color:#24231f;padding:8px 2px 0;">{name}</span>
              <span style="display:block;font:900 20px/1.2 Arial,Helvetica,sans-serif;color:#ff5a2f;padding:1px 2px 6px;">${price}</span>
            </a>
          </td>"""

def button(label, content, full=False):
    w = 'display:block;' if full else 'display:inline-block;'
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btnt"><tr>
          <td align="center" bgcolor="#ff5a2f" style="border-radius:999px;">
            <a href="{link(content)}" target="_blank" style="{w}padding:19px 34px;font:900 18px/1 Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none;border-radius:999px;background:#ff5a2f;">{label}</a>
          </td></tr></table>"""

html = f"""<!DOCTYPE html>
<html lang="en-CA" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<title>Custom workwear for your crew | Affinity Creative</title>
<style>
  body{{margin:0;padding:0;background:#ebe8e1;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}}
  table{{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;}}
  img{{-ms-interpolation-mode:bicubic;}}
  a{{color:#11110f;}}
  @media only screen and (max-width:620px){{
    .wrap{{width:100% !important;}}
    .pad{{padding-left:22px !important;padding-right:22px !important;}}
    .mbr{{display:inline !important;}}
    .h1{{font-size:34px !important;line-height:1.08 !important;}}
    .tile{{display:block !important;float:left !important;width:50% !important;box-sizing:border-box !important;}}
    .btnt,.btnt td,.btnt a{{display:block !important;width:100% !important;box-sizing:border-box !important;}}
    .tiles{{padding-left:14px !important;padding-right:14px !important;}}
  }}
</style>
</head>
<body style="margin:0;padding:0;background:#ebe8e1;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#ebe8e1;font-size:1px;line-height:1px;">Embroidered polos from $19, hoodies from $38. Send your logo and get a quote for the whole crew.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ebe8e1;">
<tr><td align="center" style="padding:16px 8px;">

  <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#f4f1ea;">

    <!-- Logo bar -->
    <tr><td align="center" style="background:#ffffff;padding:16px 20px;border-bottom:4px solid #ff5a2f;">
      <a href="https://affinitycreative.ca/" target="_blank"><img src="{BASE}/images/email/affinity-logo-email.jpg" width="170" alt="Affinity Creative" style="display:block;width:170px;height:auto;border:0;"></a>
    </td></tr>

    <!-- Hero photo, full width -->
    <tr><td style="font-size:0;line-height:0;">
      <a href="{link('hero_image')}" target="_blank"><img src="{BASE}/images/email/workwear-hero-email.jpg" width="600" alt="Black polo, white T-shirt, orange hoodie and black beanie with an embroidered company logo" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a>
    </td></tr>

    <!-- Hook + button (above the fold) -->
    <tr><td class="pad" style="padding:28px 32px 0;">
      <p style="margin:0 0 10px;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#ff5a2f;">Winter workwear &middot; Toronto &amp; GTA</p>
      <h1 class="h1" style="margin:0 0 14px;font:900 42px/1.06 Arial,Helvetica,sans-serif;letter-spacing:-0.5px;color:#11110f;">Your crew.<span class="mbr" style="display:none;"><br></span> Your logo.<br><span style="color:#ff5a2f;">Polos from $19.</span></h1>
      <p style="margin:0;font:400 17px/1.5 Arial,Helvetica,sans-serif;color:#24231f;">Custom polos, hoodies, T-shirts and beanies with your company logo, from a local GTA shop. Send us your logo and we'll quote the whole crew.</p>
    </td></tr>
    <tr><td class="pad" style="padding:22px 32px 0;">
      {button('See prices &amp; get a quote &rarr;', 'hero_button', True)}
    </td></tr>
    <tr><td class="pad" style="padding:14px 32px 0;">
      <p style="margin:0;font:700 13px/1.6 Arial,Helvetica,sans-serif;color:#66635d;"><span style="color:#ff5a2f;">&bull;</span> Local GTA service &nbsp;<span style="color:#ff5a2f;">&bull;</span> Embroidery &amp; printing &nbsp;<span style="color:#ff5a2f;">&bull;</span> Bulk orders welcome</p>
    </td></tr>

    <!-- Price tiles -->
    <tr><td class="pad" style="padding:34px 32px 8px;">
      <p style="margin:0;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#66635d;">Starting prices, each (CAD)</p>
    </td></tr>
    <tr><td class="tiles" style="padding:0 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          {tile('polo', 'Polo', 19, 'Black embroidered polo', 'product_polo')}
          {tile('hoodie', 'Hoodie', 38, 'Orange hoodie with embroidered logo', 'product_hoodie')}
          {tile('tshirt', 'T-shirt', 18, 'White T-shirt with printed logo', 'product_tshirt')}
          {tile('beanie', 'Beanie', 15, 'Black beanie with embroidered logo', 'product_beanie')}
      </tr></table>
    </td></tr>

    <!-- Second button -->
    <tr><td class="pad" style="padding:18px 32px 30px;clear:both;">
      {button('Get a quote for my crew &rarr;', 'bottom_button', True)}
    </td></tr>

    <!-- Contact -->
    <tr><td class="pad" style="background:#11110f;padding:24px 32px;">
      <p style="margin:0 0 6px;font:900 20px/1.2 Arial,Helvetica,sans-serif;color:#ffffff;">Rather talk it through?</p>
      <p style="margin:0;font:700 15px/1.9 Arial,Helvetica,sans-serif;color:#ffffff;">
        <a href="tel:+14373131510" style="color:#ffffff;">Call 437-313-1510</a> &nbsp;|&nbsp; <a href="{WA}" target="_blank" style="color:#ffffff;">WhatsApp us</a><br>
        <a href="mailto:info@affinitycreative.ca" style="color:#ffffff;">info@affinitycreative.ca</a>
      </p>
    </td></tr>

    <!-- Fine print + footer -->
    <tr><td class="pad" style="padding:20px 32px 6px;">
      <p style="margin:0;font:400 12px/1.5 Arial,Helvetica,sans-serif;color:#66635d;">Hero photo: customization example. Prices are starting prices in CAD, before taxes. Final pricing depends on garment, quantity, sizes and artwork. Any setup charges are confirmed before you order.</p>
    </td></tr>
    <tr><td class="pad" style="padding:10px 32px 28px;">
      <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#66635d;">
        Affinity Creative &middot; 376 Birchmount Rd, Scarborough, ON M1K 1M6<br>
        You're receiving this because we think custom workwear could be useful for your business.<br>
        <a href="{{{{ mirror }}}}" style="color:#66635d;">View in browser</a> &nbsp;|&nbsp; <a href="{{{{ unsubscribe }}}}" style="color:#66635d;">Unsubscribe</a>
      </p>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>
"""
out = pathlib.Path(__file__).with_name('workwear-winter-2026.html' if len(sys.argv) < 2 else 'preview.html')
out.write_text(html, encoding='utf-8'); print('wrote', out, len(html), 'bytes')
