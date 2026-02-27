import os
f = 'app/page.js'
c = open(f).read()

# 1. Bigger password toggle
c = c.replace(
'<div className="flex justify-center gap-2 mb-4">\n          <button onClick={() => changeLang("en")} className={`rounded-full px-4 py-1.5 text-xs font-bold border-2 transition-all ${lang === "en" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500"}`}>🇺🇸 English</button>\n          <button onClick={() => changeLang("es")} className={`rounded-full px-4 py-1.5 text-xs font-bold border-2 transition-all ${lang === "es" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500"}`}>🇲🇽 Español</button>\n        </div>',
'<div className="mb-5"><p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">🌐 Language / Idioma</p><div className="flex justify-center gap-3"><button onClick={() => changeLang("en")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "en" ? "border-green-600 bg-green-500 text-white shadow-green-200 scale-105" : "border-gray-300 bg-white text-gray-600 hover:border-green-400"}`}>🇺🇸 English</button><button onClick={() => changeLang("es")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "es" ? "border-green-600 bg-green-500 text-white shadow-green-200 scale-105" : "border-gray-300 bg-white text-gray-600 hover:border-green-400"}`}>🇲🇽 Español</button></div></div>',
1)
print("1. Password toggle bigger")

# 2. Bigger welcome toggle
c = c.replace(
'<div className="flex justify-center gap-3 mb-4">\n            <button onClick={() => changeLang("en")} className={`rounded-full px-5 py-2 text-sm font-bold border-2 transition-all ${lang === "en" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500 hover:border-green-300"}`}>🇺🇸 English</button>\n            <button onClick={() => changeLang("es")} className={`rounded-full px-5 py-2 text-sm font-bold border-2 transition-all ${lang === "es" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500 hover:border-green-300"}`}>🇲🇽 Español</button>\n          </div>',
'<div className="mb-5"><p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">🌐 Language / Idioma</p><div className="flex justify-center gap-3"><button onClick={() => changeLang("en")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "en" ? "border-green-600 bg-green-500 text-white shadow-green-200 scale-105" : "border-gray-300 bg-white text-gray-600 hover:border-green-400"}`}>🇺🇸 English</button><button onClick={() => changeLang("es")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "es" ? "border-green-600 bg-green-500 text-white shadow-green-200 scale-105" : "border-gray-300 bg-white text-gray-600 hover:border-green-400"}`}>🇲🇽 Español</button></div></div>',
1)
print("2. Welcome toggle bigger")

# 3. Bigger header toggle with pulse
c = c.replace(
'<button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800 hover:bg-green-200 transition-colors">{lang === "en" ? "🌐 ES" : "🌐 EN"}</button>',
'<button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="rounded-full bg-green-500 px-3 py-1.5 text-sm font-bold text-white hover:bg-green-600 transition-all shadow-md animate-pulse hover:animate-none">{lang === "en" ? "🇲🇽 ES" : "🇺🇸 EN"}</button>',
1)
print("3. Header toggle bigger")

# 4. Floating globe button
marker = '    </div>\n  );\n}'
floating = '''      {/* FLOATING LANGUAGE BUTTON */}
      <button
        onClick={() => changeLang(lang === "en" ? "es" : "en")}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 hover:scale-110 transition-all flex items-center justify-center text-xl font-bold border-2 border-white"
        style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}
      >
        {lang === "en" ? "🇲🇽" : "🇺🇸"}
      </button>
''' + marker
c = c.replace(marker, floating, 1)
print("4. Floating globe button added")

open(f,'w').write(c)
print("Done!")
