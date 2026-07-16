import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { PORTFOLIO } from './portfolio-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  data = PORTFOLIO;
  year = new Date().getFullYear();

  navOpen = false;
  isDark = true;

  // helper arrays for color cycling
  expBorderClasses = ['border-blue', 'border-green', 'border-purple', 'border-orange'];
  skillCatClasses = ['cat-blue', 'cat-teal', 'cat-purple', 'cat-orange'];

  ngOnInit(): void {
    this.initThemeFromDom();
    this.applyTheme();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
    this.setupNavHighlighting();
    this.setupTouchBlurFix();
  }

  openChatFromHero(): void {
  // dispatch a global event that the chat widget listens to
  window.dispatchEvent(new CustomEvent('open-portfolio-chat'));
}

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  private initThemeFromDom(): void {
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    const bodyTheme = document.body.getAttribute('data-theme');
    const theme = htmlTheme || bodyTheme || 'dark';
    this.isDark = theme === 'dark';
  }

  private applyTheme(): void {
    const theme = this.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    // Update the icon class if present
    const icon = document.getElementById('theme-icon');
    if (icon) {
      const darkIcon = icon.getAttribute('data-dark-icon') || 'fa-moon';
      const lightIcon = icon.getAttribute('data-light-icon') || 'fa-sun';
      icon.className = 'fas ' + (this.isDark ? darkIcon : lightIcon);
    }
  }

  private setupScrollAnimations(): void {
    // Slide-in
    const slideObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.slide-left, .slide-right').forEach(el => slideObserver.observe(el));

    // Fade-in sections
    const fadeObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(el => fadeObserver.observe(el));
  }

  private setupNavHighlighting(): void {
    const navLinks = Array.from(
      document.querySelectorAll('.main-nav a[href^="#"]')
    ) as HTMLAnchorElement[];

    const sections = navLinks
      .map(link => document.querySelector(link.getAttribute('href') || ''))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const header = document.querySelector('.site-header') as HTMLElement | null;

    const setActive = (id: string) => {
      navLinks.forEach(link =>
        link.classList.toggle('active-nav', link.getAttribute('href') === '#' + id)
      );
    };

    let lockUntil = 0;   // briefly ignore scroll after a click
    let ticking = false;

    const update = () => {
      ticking = false;
      if (Date.now() < lockUntil) return;

      const headerH = header ? header.offsetHeight : 0;
      const line = window.scrollY + headerH + 20;  // detection line under the header

      let currentId = sections[0].id;
      for (const s of sections) {
        if (s.offsetTop <= line) currentId = s.id;
      }

      // At the very bottom, force the last section (handles a short final section)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        currentId = sections[sections.length - 1].id;
      }

      setActive(currentId);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Instant highlight on click; lock so the smooth scroll doesn't override it
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        setActive(href.slice(1));
        lockUntil = Date.now() + 800;
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();  // set the correct link on first load
  }

  private setupTouchBlurFix(): void {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (!isTouch) return;

    const blurActive = () => {
      const el = document.activeElement as HTMLElement | null;
      if (el && el.matches('a,button,.btn,.social-btn,.explore-btn')) el.blur();
    };

    document.querySelectorAll('a,button,.btn,.social-btn,.explore-btn').forEach(el => {
      el.addEventListener('touchend', () => (el as HTMLElement).blur(), { passive: true });
      el.addEventListener('mouseup', () => (el as HTMLElement).blur());
    });

    window.addEventListener('pageshow', () => setTimeout(blurActive, 0));
  }
}
