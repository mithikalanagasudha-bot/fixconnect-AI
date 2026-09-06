/* ==========================================================================
   FIXCONNECT AI - SERVICE PROVIDER DASHBOARD INTERACTION LOGIC
   Handles single-page module routing, availability state, job acceptance, and status updates.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSidebarNavigation();
  initMobileDrawer();
});

// Single-Page Sidebar Section Switcher
function initSidebarNavigation() {
  const links = document.querySelectorAll('.sidebar-link[data-section]');
  const sections = document.querySelectorAll('.dashboard-section');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSectionId = link.getAttribute('data-section');
      switchSection(targetSectionId);
    });
  });
}

function switchSection(sectionId) {
  const links = document.querySelectorAll('.sidebar-link[data-section]');
  const sections = document.querySelectorAll('.dashboard-section');

  // Deactivate all
  links.forEach(l => l.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));

  // Activate target link
  const targetLink = document.querySelector(`.sidebar-link[data-section="${sectionId}"]`);
  if (targetLink) {
    targetLink.classList.add('active');
  }

  // Activate target section
  const targetSection = document.getElementById(`section-${sectionId}`);
  if (targetSection) {
    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Close mobile drawer if open
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('mobile-open')) {
    sidebar.classList.remove('mobile-open');
  }
}

// Mobile Sidebar Drawer Toggle
function initMobileDrawer() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

// Online / Offline Availability Toggle Handler
function toggleAvailability(toggleInput) {
  const statusText = document.getElementById('sidebarAvailabilityStatus');
  const statusDot = document.querySelector('.sidebar-status-card .status-dot');

  if (toggleInput.checked) {
    if (statusText) statusText.textContent = 'Available for Work';
    if (statusDot) {
      statusDot.style.background = 'var(--green-600)';
      statusDot.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.2)';
    }
    alert('Status set to ONLINE. Nearby customers can now discover your services.');
  } else {
    if (statusText) statusText.textContent = 'Offline / Busy';
    if (statusDot) {
      statusDot.style.background = 'var(--slate-400)';
      statusDot.style.boxShadow = 'none';
    }
    alert('Status set to OFFLINE. New service dispatches paused.');
  }
}

// Accept Request Handler
function acceptRequest(reqId, customerName) {
  alert(`✅ Request ${reqId} Accepted!\nCustomer ${customerName} notified. Navigation route loaded.`);
  switchSection('ongoing-services');
}

// Reject Request Handler
function rejectRequest(buttonElem) {
  const card = buttonElem.closest('.dash-card') || buttonElem.closest('div[style*="background"]');
  if (card) {
    card.style.opacity = '0.4';
    buttonElem.disabled = true;
    buttonElem.textContent = 'Declined';
  }
}

// Update Job Status Handler
function updateJobStatus(newStatus) {
  alert(`🎉 Job Status Updated to: ${newStatus}!\nCustomer invoice generated and warranty protection activated.`);
  switchSection('completed-services');
}
