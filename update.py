import sys

def process_file():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    html = html.replace('<link rel="stylesheet" href="styles.css">', 
                        '<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n    <link rel="stylesheet" href="styles.css?v=2">')
    html = html.replace('<script src="script.js"></script>', 
                        '<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n    <script src="script.js?v=2"></script>')

    html = html.replace(' fade-in-up delay-1"', '" data-aos="fade-up" data-aos-delay="100"')
    html = html.replace(' fade-in-up delay-2"', '" data-aos="fade-up" data-aos-delay="200"')
    html = html.replace(' fade-in-up delay-3"', '" data-aos="fade-up" data-aos-delay="300"')
    html = html.replace(' fade-in-up delay-4"', '" data-aos="fade-up" data-aos-delay="400"')

    html = html.replace(' fade-in-up"', '" data-aos="fade-up"')
    html = html.replace(' fade-in-left"', '" data-aos="fade-right"')
    html = html.replace(' fade-in-right"', '" data-aos="fade-left"')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Replacements applied")

process_file()
