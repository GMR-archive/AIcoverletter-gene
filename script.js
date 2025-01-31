document.getElementById('resumeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        jobDescription: document.getElementById('jobDescription').value,
        question: document.getElementById('question').value,
        minChars: 100,
        maxChars: 500,
        content: document.getElementById('content').value
    };

    const prompt = `
다음 정보를 기반으로 자기소개서를 첨삭할 것.

    기업: ${formData.company}
    직무: ${formData.position}
    직무설명: ${formData.jobDescription}
    문항: ${formData.question}
    글자수 제한: ${formData.minChars}~${formData.maxChars}자

    원문:
    ${formData.content}
    `;

    try {
        const API_KEY = '여기에_본인_API_KEY_입력';
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'Gpt-4o-mini', // 사용할 OpenAI 모델
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7
            })
        });

        const result = await response.json();
        if (result.choices && result.choices.length > 0) {
            document.getElementById('resultContent').textContent = result.choices[0].message.content;
            document.getElementById('resultSection').classList.remove('hidden');
        } else {
            throw new Error('응답 데이터 오류');
        }
    } catch (error) {
        console.error('오류 발생:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
});
