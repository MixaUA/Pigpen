        const mapping = {
            'А': 'base-1', 'Б': 'base-2', 'В': 'base-3', 'Г': 'base-4', 'Ґ': 'base-5', 'Д': 'base-6', 'Е': 'base-7', 'Є': 'base-8', 'Ж': 'base-9',
            'З': ['base-1', 'dot'], 'И': ['base-2', 'dot'], 'І': ['base-3', 'dot'], 'Ї': ['base-4', 'dot'], 'Й': ['base-5', 'dot'], 'К': ['base-6', 'dot'], 'Л': ['base-7', 'dot'], 'М': ['base-8', 'dot'], 'Н': ['base-9', 'dot'],
            'О': ['base-1', 'sq'], 'П': ['base-2', 'sq'], 'Р': ['base-3', 'sq'], 'С': ['base-4', 'sq'], 'Т': ['base-5', 'sq'], 'У': ['base-6', 'sq'], 'Ф': ['base-7', 'sq'], 'Х': ['base-8', 'sq'], 'Ц': ['base-9', 'sq'],
            'Ч': ['base-1', 'tri'], 'Ш': ['base-2', 'tri'], 'Щ': ['base-3', 'tri'], 'Ь': ['base-4', 'tri'], 'Ю': ['base-5', 'tri'], 'Я': ['base-6', 'tri'], '.': ['base-7', 'tri'], ',': ['base-8', 'tri'], ' ': ['base-9', 'tri']
        };

        const inp = document.getElementById('input');
        const out = document.getElementById('output');

        function updateSize(val) {
            document.documentElement.style.setProperty('--char-size', val + 'px');
            document.getElementById('sizeVal').innerText = val + 'px';
            autoResizeTextarea();
        }

        function addChar(char) {
            inp.value += char;
            render();
            inp.scrollTop = inp.scrollHeight;
        }

        function autoResizeTextarea() {
            inp.style.height = 'auto';
            inp.style.height = (inp.scrollHeight) + 'px';
        }

        function createSVG(ids) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 50 50");
            const parts = Array.isArray(ids) ? ids : [ids];
            parts.forEach(p => {
                const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
                use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + p);
                svg.appendChild(use);
            });
            return svg;
        }

        function render() {
            autoResizeTextarea();
            const val = inp.value.toUpperCase();
            out.innerHTML = '';
            for (let char of val) {
                const wrapper = document.createElement('div');
                wrapper.className = 'symbol-wrapper';

                const target = mapping[char];
                if (target) {
                    wrapper.appendChild(createSVG(target));
                    out.appendChild(wrapper);
                } else if (char === '\n') {
                    const br = document.createElement('div');
                    br.style.width = '100%';
                    out.appendChild(br);
                } else if (char !== '\r') {
                    wrapper.appendChild(createSVG('base-unknown'));
                    const label = document.createElement('span');
                    label.className = 'unknown-label';
                    label.innerText = char;
                    wrapper.appendChild(label);
                    out.appendChild(wrapper);
                }
            }
        }

        inp.addEventListener('input', render);
        
        function clearAll() {
            inp.value = '';
            out.innerHTML = '';
            inp.style.height = '85px';
        }

        document.addEventListener('DOMContentLoaded', (event) => {
            const yearSpan = document.getElementById('copyright-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });