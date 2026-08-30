/* ==========================================================================
   FIXCONNECT AI - CUSTOMER DASHBOARD INTERACTION LOGIC
   Handles single-page module switching, mobile drawer toggle, forms, and AI simulation.
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

// Service Request Submit Simulation
function handleRequestSubmit(event) {
  event.preventDefault();
  const category = document.getElementById('serviceCategory').value;
  const desc = document.getElementById('complaintDesc').value;
  
  if (!category || !desc) {
    alert('Please fill out all required fields.');
    return;
  }

  alert(`Service Request Submitted Successfully!\nCategory: ${category}\nOur AI system is now dispatching nearby technicians.`);
  switchSection('tracking');
}

// Image Upload Preview Handler
function previewUpload(event) {
  const file = event.target.files[0];
  const previewDiv = document.getElementById('uploadPreview');
  if (file && previewDiv) {
    previewDiv.innerHTML = `<i class="fa-solid fa-file-image"></i> Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  }
}

// AI Diagnostic Interactive Simulation
function runAiDiagnostic() {
  const text = document.getElementById('aiInputText').value;
  const summaryText = document.getElementById('aiSummaryText');
  const aiCat = document.getElementById('aiCat');
  const aiSev = document.getElementById('aiSev');
  const aiTechCat = document.getElementById('aiTechCat');
  const aiEstCost = document.getElementById('aiEstCost');

  if (!text.trim()) {
    alert('Please enter a description of the issue.');
    return;
  }

  summaryText.innerHTML = `<strong>AI Diagnostic Result:</strong> Analyzed "${text.slice(0, 45)}...". High likelihood of electrical component thermal overload or valve misalignment.`;
  aiCat.textContent = 'Smart Diagnostics';
  aiSev.textContent = 'High Priority';
  aiSev.style.color = '#dc2626';
  aiTechCat.textContent = 'Master Specialist Required';
  aiEstCost.textContent = '₹800 - ₹1,500';

  alert('AI Analysis Complete!');
}

// Emergency SOS Trigger Simulation
function triggerSosAlert() {
  const confirmSos = confirm('ARE YOU SURE? Pressing OK will broadcast an immediate HIGH PRIORITY SOS alert to all available nearby emergency technicians!');
  if (confirmSos) {
    alert('🚨 EMERGENCY SOS BROADCAST SENT!\nTechnicians within 5km notified. Hotline team calling your phone in 60 seconds.');
    switchSection('tracking');
  }
}
