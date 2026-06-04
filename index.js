

document.addEventListener('DOMContentLoaded', () => {

    const checkboxes = document.querySelectorAll('.task-checkbox');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercentLabel = document.getElementById('progressPercent');
    const completionValLabel = document.getElementById('completionVal');
    const verificationValLabel = document.getElementById('verificationVal');

    const submissionForm = document.getElementById('submissionForm');
    const repoLinkInput = document.getElementById('repoLink');
    const liveLinkInput = document.getElementById('liveLink');

    const repoError = document.getElementById('repoError');
    const liveError = document.getElementById('liveError');
    const submitBtn = document.getElementById('submitBtn');

    const successModal = document.getElementById('successModal');
    const modalRepoText = document.getElementById('modalRepoText');
    const modalLiveText = document.getElementById('modalLiveText');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    const timelineNodes = document.querySelectorAll('.timeline-node');


    let completionPercentage = 0;




    function updateProgress() {
        const totalTasks = checkboxes.length;
        const checkedTasks = document.querySelectorAll('.task-checkbox:checked').length;

        completionPercentage = Math.round((checkedTasks / totalTasks) * 100);


        progressBarFill.style.width = `${completionPercentage}%`;
        progressPercentLabel.textContent = `${completionPercentage}%`;
        completionValLabel.textContent = `${completionPercentage}%`;


        if (completionPercentage === 0) {
            progressBarFill.style.background = 'var(--primary)';
        } else if (completionPercentage === 100) {
            progressBarFill.style.background = 'linear-gradient(90deg, var(--secondary) 0%, var(--success) 100%)';
        } else {
            progressBarFill.style.background = 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)';
        }
    }


    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }


    function isValidGitHubUrl(url) {
        return isValidUrl(url) && url.toLowerCase().includes('github.com');
    }




    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateProgress();


            const item = checkbox.closest('.checklist-item');
            if (checkbox.checked) {
                item.style.transform = 'scale(0.99)';
                setTimeout(() => item.style.transform = 'none', 100);
            }
        });
    });


    submissionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const repoLink = repoLinkInput.value.trim();
        const liveLink = liveLinkInput.value.trim();


        repoLinkInput.closest('.form-group').classList.remove('invalid');
        liveLinkInput.closest('.form-group').classList.remove('invalid');


        if (completionPercentage < 100) {

            const workboardCard = document.querySelector('.workboard-card');
            workboardCard.style.animation = 'shake-element 0.5s ease-in-out';
            setTimeout(() => workboardCard.style.animation = '', 500);

            alert('⚠️ Qualification Requirement: Please complete all Checklist items (100% completion) before submitting S1 deliverables.');
            return;
        }


        if (!isValidGitHubUrl(repoLink)) {
            repoLinkInput.closest('.form-group').classList.add('invalid');
            isValid = false;
        }


        if (!isValidUrl(liveLink)) {
            liveLinkInput.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        if (!isValid) return;


        submitBtn.classList.add('loading');
        submitBtn.disabled = true;


        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;


            modalRepoText.textContent = repoLink;
            modalRepoText.href = repoLink;
            modalLiveText.textContent = liveLink;
            modalLiveText.href = liveLink;


            successModal.classList.add('show');


            verificationValLabel.textContent = 'Submitted for Review';
            verificationValLabel.className = 'stat-value text-cyan';


            unlockNextSprint();
        }, 1500);
    });


    function unlockNextSprint() {
        const sprint2Node = timelineNodes[1];
        if (sprint2Node && sprint2Node.classList.contains('locked')) {
            sprint2Node.classList.remove('locked');
            sprint2Node.classList.add('unlocked');


            const indicator = sprint2Node.querySelector('.node-indicator');
            indicator.innerHTML = '<i class="fa-solid fa-circle-check text-cyan"></i>';

            const nodeStatus = sprint2Node.querySelector('.node-status');
            nodeStatus.textContent = 'Unlocked';
            nodeStatus.className = 'node-status text-cyan';
        }
    }


    modalCloseBtn.addEventListener('click', () => {
        successModal.classList.remove('show');


        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    });


    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('show');
        }
    });


    updateProgress();
});


const style = document.createElement('style');
style.innerHTML = `
@keyframes shake-element {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
}
`;
document.head.appendChild(style);
