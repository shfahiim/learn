import os
import re

COMPONENTS_DIR = "/home/fahim/Desktop/projects/learn/docs/components"
CSS_FILE = "/home/fahim/Desktop/projects/learn/docs/styles/globals.css"

def fix_css():
    with open(CSS_FILE, "r") as f:
        content = f.read()

    # Fix chart height on mobile
    if ".h-\\[400px\\] {" in content:
        content = re.sub(
            r'@media \(max-width: 640px\) \{[\s\S]*?\.h-\\[250px\\] \{[^}]+\}\n\}',
            r'''@media (max-width: 640px) {
  .h-\\[400px\\] { height: 240px; min-height: 240px; }
  .h-\\[350px\\] { height: 220px; min-height: 220px; }
  .h-\\[300px\\] { height: 200px; min-height: 200px; }
  .h-\\[250px\\] { height: 180px; min-height: 180px; }
}''',
            content
        )

    # Fix horizontal squishing on mobile (Bug #6 found by user)
    content = re.sub(
        r'@media \(max-width: 640px\) \{\n\s*\.chart-card-inner \{\n\s*padding: 0\.9rem;\n\s*\}\n\}',
        r'''@media (max-width: 640px) {
  .chart-card-inner {
    padding: 0.75rem 0.5rem; /* Reduced horizontal padding drastically */
  }
}''',
        content
    )

    # Add sm:grid-cols-2 utility for better responsiveness
    if ".sm\\:grid-cols-2" not in content:
        content += "\n@media (min-width: 640px) {\n  .sm\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n"
    if ".lg\\:grid-cols-3" not in content:
        content += "\n@media (min-width: 1024px) {\n  .lg\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n"

    # Fix touch target sizing for sliders and buttons
    content = re.sub(
        r'input\[type=range\]\.modern-slider::(-webkit-|-moz-)slider-thumb \{\n\s*(?:-webkit-appearance: none;\n\s*)?height: [^;]+;\n\s*width: [^;]+;',
        r'input[type=range].modern-slider::\1slider-thumb {\n  -webkit-appearance: none;\n  height: 22px;\n  width: 22px;',
        content
    )

    with open(CSS_FILE, "w") as f:
        f.write(content)

def fix_tsx_files():
    for root, _, files in os.walk(COMPONENTS_DIR):
        for file in files:
            if not file.endswith(".tsx"): continue
            filepath = os.path.join(root, file)
            
            with open(filepath, "r") as f:
                content = f.read()

            orig_content = content

            # Fix 1: Hardcoded backgrounds to CSS variables
            content = content.replace('bg-white shadow-inner', 'var(--surface-1)')
            content = content.replace('bg-white', 'var(--surface-1)')
            content = content.replace('bg-slate-50', 'var(--surface-2)')
            content = content.replace('bg-slate-100', 'var(--surface-3)')
            content = content.replace('bg-gray-100', 'var(--surface-3)')
            content = content.replace("border-gray-100", "border-var(--chart-border)")

            # Fix 2: 3-column layouts skipping tablet step
            content = content.replace('md:grid-cols-3', 'sm:grid-cols-2 lg:grid-cols-3')

            # Fix 3: Recharts hardcoded generic colours
            content = content.replace('fill="#8884d8"', 'fill="var(--chart-primary)"')
            content = content.replace('fill="#82ca9d"', 'fill="var(--chart-success)"')
            content = content.replace('stroke="#8884d8"', 'stroke="var(--chart-primary)"')
            content = content.replace('stroke="#82ca9d"', 'stroke="var(--chart-success)"')
            content = content.replace('stroke="#ff7300"', 'stroke="var(--chart-secondary)"')
            content = content.replace('stroke="#ff4d4f"', 'stroke="var(--chart-danger)"')

            # Fix 4: Button styles inline fixes (for dark mode support)
            content = content.replace('text-slate-600', 'text-[var(--chart-text)]')
            content = content.replace('text-gray-600', 'text-[var(--chart-text)]')
            
            # The manual button class string fixes (for Perceptron/Polynomial/LearningCurves)
            content = re.sub(r"bg-blue-600\s+hover:bg-blue-700\s+text-white", "bg-[var(--chart-primary)] text-white hover:opacity-90", content)
            content = re.sub(r"bg-red-600\s+text-white", "bg-[var(--chart-danger)] text-white", content)
            
            if content != orig_content:
                with open(filepath, "w") as f:
                    f.write(content)

fix_css()
fix_tsx_files()
print("Done processing visual fixes.")
