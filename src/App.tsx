import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';

// Modals
import { AppointmentDetailModal } from './components/modals/AppointmentDetailModal';
import { AppointmentFormModal } from './components/modals/AppointmentFormModal';
import { ClientFormModal } from './components/modals/ClientFormModal';
import { PaymentFormModal } from './components/modals/PaymentFormModal';
import { ServiceFormModal } from './components/modals/ServiceFormModal';
import { QuickActionModal } from './components/modals/QuickActionModal';
import { AuthModal } from './components/modals/AuthModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { CalendarPage } from './pages/CalendarPage';
import { ClientsPage } from './pages/ClientsPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { BookingsPage } from './pages/BookingsPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const {
    currentRoute,
    selectedClientId,
    navigateTo,
    isAuthenticated,
    hasActiveSubscription,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If on landing page route '/'
  if (currentRoute === '/') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    );
  }

  // If on pricing page route '/tarifs' or '/pricing'
  if (currentRoute === '/tarifs' || currentRoute === '/pricing') {
    return (
      <>
        <PricingPage />
        <ToastContainer />
      </>
    );
  }

  // If on checkout page route '/checkout'
  if (currentRoute === '/checkout') {
    return (
      <>
        <CheckoutPage />
        <ToastContainer />
      </>
    );
  }

  // If on login / register auth page
  if (currentRoute === '/login' || currentRoute === '/auth') {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  // ROUTE PROTECTION 1: Not authenticated trying to access protected /app routes
  if (!isAuthenticated && currentRoute.startsWith('/app')) {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  // ROUTE PROTECTION 2: Authenticated, but institute subscription is NOT yet paid/active
  // Mandatory payment required before accessing the institute's management space
  if (isAuthenticated && !hasActiveSubscription && currentRoute.startsWith('/app')) {
    return (
      <>
        <CheckoutPage />
        <ToastContainer />
      </>
    );
  }

  // Render SaaS Dashboard application pages
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/app':
        return <DashboardPage />;
      case '/app/calendar':
        return <CalendarPage />;
      case '/app/clients':
        if (selectedClientId) {
          return (
            <ClientDetailPage
              clientId={selectedClientId}
              onBack={() => navigateTo('/app/clients')}
            />
          );
        }
        return <ClientsPage />;
      case '/app/bookings':
        return <BookingsPage />;
      case '/app/services':
        return <ServicesPage />;
      case '/app/team':
        return <TeamPage />;
      case '/app/payments':
        return <PaymentsPage />;
      case '/app/reports':
        return <ReportsPage />;
      case '/app/settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FCFBF8] text-[#24312B] font-sans selection:bg-[#E8EEE8] selection:text-[#16382D]">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Global Modals */}
      <AppointmentDetailModal />
      <AppointmentFormModal />
      <ClientFormModal />
      <PaymentFormModal />
      <ServiceFormModal />
      <QuickActionModal />
      <AuthModal />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
