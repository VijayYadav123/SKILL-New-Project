document.addEventListener('DOMContentLoaded', () => {
    const designInput = document.getElementById('design-input');
    const actualInput = document.getElementById('actual-input');
    const compareBtn = document.getElementById('compare-btn');
    const resultsSection = document.getElementById('results');
    const reportBody = document.getElementById('report-body');

    // Handle Image Previews
    const handlePreview = (input, previewId) => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById(previewId);
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                preview.style.animation = 'fadeIn 0.5s ease-out';
            };
            reader.readAsDataURL(file);
        }
    };

    designInput.addEventListener('change', () => handlePreview(designInput, 'design-preview'));
    actualInput.addEventListener('change', () => handlePreview(actualInput, 'actual-preview'));

    // Mock Observation Data
    const mockObservations = [
        {
            element: 'Hero Title',
            attribute: 'font-size',
            design: '64px',
            actual: '58px',
            impact: 'Reduced visual hierarchy in the hero section.'
        },
        {
            element: 'Subheading',
            attribute: 'line-height',
            design: '1.6',
            actual: '1.2',
            impact: 'Readability issue; text feels too cramped.'
        },
        {
            element: 'CTA Button',
            attribute: 'letter-spacing',
            design: '-0.02em',
            actual: 'normal',
            impact: 'Typography looks loose and inconsistent with brand guidelines.'
        }
    ];

    compareBtn.addEventListener('click', () => {
        // Validation: Ensure both images are uploaded
        if (!designInput.files[0] || !actualInput.files[0]) {
            alert('Please upload both the Design Reference and the Live Implementation images.');
            return;
        }

        // Simulate Loading state
        compareBtn.querySelector('.btn-text').innerText = 'Analyzing Layout...';
        compareBtn.disabled = true;

        setTimeout(() => {
            // Show Results
            resultsSection.classList.remove('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth' });

            // Reset Button
            compareBtn.querySelector('.btn-text').innerText = 'Extract Observation Points';
            compareBtn.disabled = false;

            // Inject Report Rows
            reportBody.innerHTML = mockObservations.map(obs => `
                <tr>
                    <td><strong>${obs.element}</strong></td>
                    <td><code>${obs.attribute}</code></td>
                    <td>${obs.design}</td>
                    <td style="color: #ef4444">${obs.actual}</td>
                    <td>${obs.impact}</td>
                </tr>
            `).join('');

        }, 1500);
    });
});
