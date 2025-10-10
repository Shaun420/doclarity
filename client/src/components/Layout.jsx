import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  FileText, 
  Home, 
  Upload, 
  History, 
  HelpCircle, 
  Menu, 
  X, 
  LogOut,
  User,
  Settings,
  Shield,
  ChevronDown
} from 'lucide-react';
import { clsx } from 'clsx';
import AuthModal from './AuthModal';
import { useAuth } from '../contexts/AuthProvider';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
	{ name: 'Home', href: '/', icon: Home },
	{ name: 'Upload Document', href: '/upload', icon: Upload },
	{ name: 'My Documents', href: '/documents', icon: History },
	{ name: 'Help', href: '/help', icon: HelpCircle },
  ];

  const isActive = (path) => location.pathname === path;

	// Implement logout logic
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch {
      // ignore
    }
  };

  return (
	<div className="min-h-screen bg-slate-50">
	  {/* Header */}
	  <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <div className="flex justify-between items-center h-16">
			{/* Logo and Brand */}
			<div className="flex items-center">
			  <Link to="/" className="flex items-center space-x-3">
				<div className="bg-primary-600 p-2 rounded-lg">
				  <Shield className="h-6 w-6 text-white" />
				</div>
				<span className="text-xl font-bold text-slate-900 hidden sm:block">
				  Doclarity - Legal Doc Demystifier
				</span>
				<span className="text-xl font-bold text-slate-900 sm:hidden">
				  Doclarity - LDD
				</span>
			  </Link>
			</div>

			{/* Desktop Navigation */}
			<nav className="hidden md:flex items-center space-x-1">
			  {navigation.map((item) => {
				const Icon = item.icon;
				return (
				  <Link
					key={item.name}
					to={item.href}
					className={clsx(
					  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
					  isActive(item.href)
						? 'bg-primary-50 text-primary-700'
						: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
					)}
				  >
					<Icon className="h-4 w-4 mr-2" />
					{item.name}
				  </Link>
				);
			  })}
			</nav>

			{/* Right side items */}
			<div className="flex items-center space-x-3">
        {!user ? (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="hidden md:inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Log in
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="hidden md:inline-flex items-center px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white"
            >
              Get started
            </button>
          </>
        ) : (
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            >
              <div className="bg-slate-200 p-2 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{user.email}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

			  {/* Mobile menu button */}
			  <button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
			  >
				{isMobileMenuOpen ? (
				  <X className="h-6 w-6" />
				) : (
				  <Menu className="h-6 w-6" />
				)}
			  </button>
			</div>
		  </div>
		</div>

		{/* Mobile Navigation */}
		{isMobileMenuOpen && (
		  <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={clsx(
              'flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors',
              isActive(item.href)
              ? 'bg-primary-50 text-primary-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            )}
            >
            <Icon className="h-5 w-5 mr-3" />
            {item.name}
            </Link>
          );
          })}
          
          {!user ? (
            <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
              <button
                onClick={() => { setShowLogin(true); setIsMobileMenuOpen(false) }}
                className="w-full px-3 py-2 rounded-md text-base font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 text-left"
              >
                Log in
              </button>
              <button
                onClick={() => { setShowSignup(true); setIsMobileMenuOpen(false) }}
                className="w-full px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700 text-left"
              >
                Get started
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-3 mt-3">
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          )}
  			</div>
		  </div>
		)}
	  </header>

	  {/* Main Content */}
	  <main className="flex-1">
		{children}
	  </main>

	  {/* Footer */}
	  <footer className="bg-white border-t border-gray-200 mt-auto">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
			{/* Company Info */}
			<div className="col-span-1 md:col-span-2">
			  <div className="flex items-center space-x-3 mb-4">
				<div className="bg-primary-600 p-2 rounded-lg">
				  <Shield className="h-6 w-6 text-white" />
				</div>
				<span className="text-lg font-bold text-slate-900">
				  Doclarity - Legal Doc Demystifier
				</span>
			  </div>
			  <p className="text-slate-600 text-sm">
				Making legal documents accessible and understandable for everyone. 
				Powered by advanced AI to help you make informed decisions.
			  </p>
			</div>

			{/* Quick Links */}
			<div>
			  <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Links</h3>
			  <ul className="space-y-2">
				<li>
				  <Link to="/about" className="text-sm text-slate-600 hover:text-slate-900">
					About Us
				  </Link>
				</li>
				<li>
				  <Link to="/privacy" className="text-sm text-slate-600 hover:text-slate-900">
					Privacy Policy
				  </Link>
				</li>
				<li>
				  <Link to="/terms" className="text-sm text-slate-600 hover:text-slate-900">
					Terms of Service
				  </Link>
				</li>
				<li>
				  <Link to="/contact" className="text-sm text-slate-600 hover:text-slate-900">
					Contact
				  </Link>
				</li>
			  </ul>
			</div>

			{/* Support */}
			<div>
			  <h3 className="text-sm font-semibold text-slate-900 mb-3">Support</h3>
			  <ul className="space-y-2">
				<li>
				  <Link to="/help" className="text-sm text-slate-600 hover:text-slate-900">
					Help Center
				  </Link>
				</li>
				<li>
				  <Link to="/faq" className="text-sm text-slate-600 hover:text-slate-900">
					FAQ
				  </Link>
				</li>
				<li>
				  <a 
					href="mailto:support@doclarity.com" 
					className="text-sm text-slate-600 hover:text-slate-900"
				  >
					support@doclarity.com
				  </a>
				</li>
			  </ul>
			</div>
		  </div>

		  {/* Bottom Bar */}
		  <div className="mt-8 pt-8 border-t border-gray-200">
			<p className="text-center text-sm text-slate-500">
			  © 2025 Doclarity. All rights reserved. 
			  {/* <span className="mx-2">•</span>
			  Built with ❤️ using Google Cloud AI */}
			</p>
		  </div>
		</div>
	  </footer>
      {/* Auth Modals */}
      <AuthModal open={showLogin} onClose={() => setShowLogin(false)} mode="login" />
      <AuthModal open={showSignup} onClose={() => setShowSignup(false)} mode="signup" />
	</div>
  );
};

export default Layout;