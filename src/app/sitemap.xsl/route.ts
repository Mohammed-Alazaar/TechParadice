// Serves the XSLT stylesheet that browsers apply to /sitemap.xml so the
// sitemap renders as a readable table instead of raw XML. Served from a route
// handler (rather than /public) to guarantee a text/xsl content-type, which
// browsers require before they will apply an XSLT transform.

const xsl = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>TechParadice — XML Sitemap</title>
        <style>
          :root { color-scheme: dark; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: #0D0D0D;
            color: #FFFFFF;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5;
          }
          .wrap { max-width: 1100px; margin: 0 auto; padding: 40px 20px 80px; }
          header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; margin-bottom: 24px; }
          .brand { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .brand .slash { color: #5EEAD4; }
          .brand .muted { color: rgba(255,255,255,0.4); font-weight: 300; }
          h1 { font-size: 15px; font-weight: 600; margin: 16px 0 4px; color: rgba(255,255,255,0.9); }
          .meta { font-size: 13px; color: rgba(255,255,255,0.5); }
          .meta a { color: #5EEAD4; text-decoration: none; }
          .count { display: inline-block; margin-top: 12px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #5EEAD4; }
          .scroll { overflow-x: auto; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 720px; }
          thead th {
            text-align: left; padding: 12px 16px; background: rgba(255,255,255,0.03);
            font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.5);
            border-bottom: 1px solid rgba(255,255,255,0.08); white-space: nowrap;
          }
          tbody td { padding: 11px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top; }
          tbody tr:hover td { background: rgba(94,234,212,0.04); }
          tbody tr:last-child td { border-bottom: none; }
          a.loc { color: #FFFFFF; text-decoration: none; word-break: break-all; }
          a.loc:hover { color: #5EEAD4; text-decoration: underline; }
          .lang { display: inline-block; margin: 0 4px 4px 0; padding: 2px 7px; border-radius: 999px;
            background: rgba(94,234,212,0.1); color: #5EEAD4; font-size: 11px; font-weight: 600; }
          .dash { color: rgba(255,255,255,0.3); }
          td.num, th.num { text-align: right; white-space: nowrap; color: rgba(255,255,255,0.7); }
          td.date { white-space: nowrap; color: rgba(255,255,255,0.6); }
          footer { margin-top: 24px; font-size: 12px; color: rgba(255,255,255,0.35); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <div class="brand">Tech<span class="slash">/</span><span class="muted">Paradice</span></div>
            <h1>XML Sitemap</h1>
            <p class="meta">
              This is an auto-generated XML sitemap for
              <a href="https://techparadice.com">techparadice.com</a>, used by search
              engines and AI crawlers. Each row lists a page and its language alternates.
            </p>
            <span class="count">
              <xsl:value-of select="count(s:urlset/s:url)"/> URLs
            </span>
          </header>
          <div class="scroll">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Languages</th>
                  <th>Last modified</th>
                  <th>Change freq.</th>
                  <th class="num">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td>
                      <a class="loc" href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="xhtml:link">
                          <xsl:for-each select="xhtml:link">
                            <span class="lang"><xsl:value-of select="@hreflang"/></span>
                          </xsl:for-each>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="dash">—</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="date">
                      <xsl:value-of select="substring(s:lastmod, 1, 10)"/>
                    </td>
                    <td>
                      <xsl:value-of select="s:changefreq"/>
                    </td>
                    <td class="num">
                      <xsl:value-of select="s:priority"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <footer>Generated by TechParadice · schema.org compliant · hreflang annotated</footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`

export async function GET() {
  return new Response(xsl, {
    headers: {
      'Content-Type': 'text/xsl; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
