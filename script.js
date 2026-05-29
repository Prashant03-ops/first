document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. Decorative Cursor-Tracking Parallax Background Blobs
    // -----------------------------------------------------------------
    const blob1 = document.getElementById('blob-1');
    const blob2 = document.getElementById('blob-2');
    const blob3 = document.getElementById('blob-3');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        if (blob1) blob1.style.transform = `translate(${x * 60}px, ${y * 60}px)`;
        if (blob2) blob2.style.transform = `translate(${x * -40}px, ${y * -40}px)`;
        if (blob3) blob3.style.transform = `translate(${x * 50}px, ${y * -50}px)`;
    });
    // -----------------------------------------------------------------
    // 2. Navigation Scrolled Shadow & Responsive Toggle
    // -----------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking navigation links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    // -----------------------------------------------------------------
    // 3. Hero Generation Process Simulator
    // -----------------------------------------------------------------
    const heroDemoBtn = document.getElementById('hero-demo-btn');
    const loadingState = document.getElementById('hero-loading-state');
    const progressFill = document.getElementById('hero-progress-fill');
    const appMockup = document.getElementById('hero-app-mockup');
    const demoInput = document.getElementById('hero-demo-input');
    const stepLis = document.querySelectorAll('.generation-steps .step-li');
    
    let isGenerating = false;
    function runHeroSimulation() {
        if (isGenerating) return;
        isGenerating = true;
        // Reset elements
        appMockup.classList.remove('active');
        loadingState.classList.add('active');
        progressFill.style.width = '0%';
        stepLis.forEach((step, idx) => {
            step.className = 'step-li';
            if (idx === 0) step.classList.add('active');
        });
        let currentProgress = 0;
        let activeStep = 0;
        const interval = setInterval(() => {
            currentProgress += 2.5; // reaches 100% in 40 ticks * 100ms = 4 seconds
            progressFill.style.width = `${currentProgress}%`;
            // Transition text steps
            if (currentProgress >= 25 && activeStep === 0) {
                stepLis[0].className = 'step-li completed';
                stepLis[1].classList.add('active');
                activeStep = 1;
            } else if (currentProgress >= 50 && activeStep === 1) {
                stepLis[1].className = 'step-li completed';
                stepLis[2].classList.add('active');
                activeStep = 2;
            } else if (currentProgress >= 75 && activeStep === 2) {
                stepLis[2].className = 'step-li completed';
                stepLis[3].classList.add('active');
                activeStep = 3;
            }
            if (currentProgress >= 100) {
                clearInterval(interval);
                stepLis[3].className = 'step-li completed';
                
                setTimeout(() => {
                    loadingState.classList.remove('active');
                    appMockup.classList.add('active');
                    isGenerating = false;
                }, 400);
            }
        }, 100);
    }
    if (heroDemoBtn) {
        heroDemoBtn.addEventListener('click', runHeroSimulation);
    }
    
    // Auto-trigger once on page load after a brief delay
    setTimeout(runHeroSimulation, 1200);
    // -----------------------------------------------------------------
    // 4. Feature Carousel/Tabs Section
    // -----------------------------------------------------------------
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featurePanels = document.querySelectorAll('.feature-panel-content');
    featureTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const index = tab.getAttribute('data-feature');
            
            // Toggle tabs
            featureTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Toggle panels
            featurePanels.forEach(p => p.classList.remove('active'));
            const activePanel = document.getElementById(`feature-panel-${index}`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });
    // -----------------------------------------------------------------
    // 5. App Examples Showcase & Simulator
    // -----------------------------------------------------------------
    const showcaseTabs = document.querySelectorAll('.showcase-tab');
    const appMockups = document.querySelectorAll('.app-mockup');
    const showcaseUrl = document.getElementById('showcase-url');
    const appUrls = {
        'task-manager': 'https://flowtask.aetherflow.app/board',
        'finance-dashboard': 'https://apexwallet.aetherflow.app/dashboard',
        'meal-planner': 'https://nutriplan.aetherflow.app/schedule',
        'learning-hub': 'https://educenter.aetherflow.app/classroom',
        'adventure-planner': 'https://trailblaze.aetherflow.app/itinerary'
    };
    showcaseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const appName = tab.getAttribute('data-app');
            
            // Toggle showcase tabs
            showcaseTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            // Toggle active mockup app
            appMockups.forEach(app => app.classList.remove('active'));
            const activeMockup = document.getElementById(`app-${appName}`);
            if (activeMockup) {
                activeMockup.classList.add('active');
            }
            // Update simulator URL bar
            if (showcaseUrl && appUrls[appName]) {
                showcaseUrl.textContent = appUrls[appName];
            }
        });
    });
    // -----------------------------------------------------------------
    // App Interaction 1: Task Manager Board Manipulation
    // -----------------------------------------------------------------
    const todoAddBtn = document.getElementById('todo-add-btn');
    const todoInput = document.getElementById('todo-new-task-title');
    const todoColList = document.getElementById('todo-list-tasks');
    const inProgressColList = document.getElementById('inprogress-list-tasks');
    const completedColList = document.getElementById('completed-list-tasks');
    function updateColumnCounts() {
        document.querySelectorAll('.kanban-column').forEach(col => {
            const countSpan = col.querySelector('.col-count');
            const cardsCount = col.querySelectorAll('.kanban-card').length;
            if (countSpan) countSpan.textContent = cardsCount;
        });
    }
    function createKanbanCardElement(id, title, priority = 'Medium') {
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.setAttribute('data-task-id', id);
        
        let priorityClass = 'priority-med';
        if (priority === 'High') priorityClass = 'priority-high';
        if (priority === 'Low') priorityClass = 'priority-low';
        card.innerHTML = `
            <div class="kb-card-tags"><span class="kb-tag ${priorityClass}">${priority}</span></div>
            <p class="kb-card-title">${escapeHtml(title)}</p>
            <div class="kb-card-footer">
                <span class="kb-date">📅 Just now</span>
                <button class="kb-action-btn move-progress" title="Move to In Progress">👉</button>
            </div>
        `;
        return card;
    }
    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    if (todoAddBtn && todoInput && todoColList) {
        todoAddBtn.addEventListener('click', () => {
            const taskTitle = todoInput.value.trim();
            if (!taskTitle) return;
            
            const randomId = 't_' + Math.random().toString(36).substr(2, 9);
            const priorities = ['High', 'Medium', 'Low'];
            const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
            
            const card = createKanbanCardElement(randomId, taskTitle, randomPriority);
            todoColList.appendChild(card);
            todoInput.value = '';
            updateColumnCounts();
        });
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                todoAddBtn.click();
            }
        });
    }
    // Delegation handler for Kanban movements
    const simulatorCanvas = document.getElementById('simulator-canvas');
    if (simulatorCanvas) {
        simulatorCanvas.addEventListener('click', (e) => {
            // Clicked move to progress arrow
            if (e.target.classList.contains('move-progress')) {
                const card = e.target.closest('.kanban-card');
                if (card && inProgressColList) {
                    // Update actions inside card for In Progress state
                    const footer = card.querySelector('.kb-card-footer');
                    footer.innerHTML = `
                        <span class="kb-date">⏳ Active</span>
                        <button class="kb-action-btn move-done" title="Complete task">✅</button>
                    `;
                    inProgressColList.appendChild(card);
                    updateColumnCounts();
                }
            }
            // Clicked complete checkmark
            else if (e.target.classList.contains('move-done')) {
                const card = e.target.closest('.kanban-card');
                if (card && completedColList) {
                    card.classList.add('completed');
                    const tags = card.querySelector('.kb-card-tags');
                    tags.innerHTML = '<span class="kb-tag priority-med">Completed</span>';
                    
                    const footer = card.querySelector('.kb-card-footer');
                    footer.innerHTML = `
                        <span class="kb-date">🎉 Closed</span>
                        <button class="kb-action-btn delete-task" title="Delete task">🗑️</button>
                    `;
                    completedColList.appendChild(card);
                    updateColumnCounts();
                }
            }
            // Clicked delete bin icon
            else if (e.target.classList.contains('delete-task')) {
                const card = e.target.closest('.kanban-card');
                if (card) {
                    card.remove();
                    updateColumnCounts();
                }
            }
        });
    }
    // -----------------------------------------------------------------
    // App Interaction 2: Finance Calculator updates
    // -----------------------------------------------------------------
    const addIncomeBtn = document.getElementById('finance-add-income');
    const transactionListUl = document.getElementById('transaction-list-ul');
    const walletBalance = document.getElementById('wallet-balance');
    let balanceValue = 14248.50;
    if (addIncomeBtn && transactionListUl && walletBalance) {
        const sampleTransactions = [
            { name: 'App Store Royalty', amount: 840.00, isIncome: true },
            { name: 'OpenAI API Usage', amount: 120.50, isIncome: false },
            { name: 'Github Copilot team', amount: 98.00, isIncome: false },
            { name: 'Product Hunt Lead', amount: 1500.00, isIncome: true },
            { name: 'Supabase Serverless', amount: 25.00, isIncome: false }
        ];
        addIncomeBtn.addEventListener('click', () => {
            const randomTx = sampleTransactions[Math.floor(Math.random() * sampleTransactions.length)];
            const txItem = document.createElement('div');
            txItem.className = 'tx-item';
            
            // Adjust balance
            if (randomTx.isIncome) {
                balanceValue += randomTx.amount;
            } else {
                balanceValue -= randomTx.amount;
            }
            // Update UI
            walletBalance.textContent = `$${balanceValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            
            const timeStr = 'Just now';
            txItem.innerHTML = `
                <div class="tx-info">
                    <span class="tx-name">${randomTx.name}</span>
                    <span class="tx-date">${timeStr}</span>
                </div>
                <span class="tx-amount ${randomTx.isIncome ? 'income' : 'expense'}">${randomTx.isIncome ? '+' : '-'}$${randomTx.amount.toFixed(2)}</span>
            `;
            
            transactionListUl.insertBefore(txItem, transactionListUl.firstChild);
            
            // Cap transactions view to 4 items max for UI fitting
            if (transactionListUl.children.length > 4) {
                transactionListUl.removeChild(transactionListUl.lastChild);
            }
        });
    }
    // -----------------------------------------------------------------
    // App Interaction 3: Meal Planner Active Days & Generator
    // -----------------------------------------------------------------
    const dayButtons = document.querySelectorAll('.meal-day-btn');
    const mealCurrentDay = document.getElementById('meal-current-day');
    const mealCalSum = document.getElementById('meal-cal-sum');
    const mealListContainer = document.getElementById('meal-list-container');
    const mealRegenerateBtn = document.getElementById('meal-regenerate-btn');
    const mealPlans = {
        monday: {
            day: 'Monday', calories: 1840, meals: [
                { time: '🍳 Breakfast', title: 'Avocado Toast & Eggs', desc: '2 sourdough, 1 avocado, 2 eggs', c: 420 },
                { time: '🥗 Lunch', title: 'Chicken Caesar Salad', desc: '150g chicken breast, romaine lettuce', c: 580 },
                { time: '🥩 Dinner', title: 'Salmon & Quinoa', desc: '200g salmon, 1 cup quinoa, asparagus', c: 840 }
            ]
        },
        tuesday: {
            day: 'Tuesday', calories: 2050, meals: [
                { time: '🍳 Breakfast', title: 'Greek Yogurt Parfait', desc: 'Greek yogurt, honey, granola, mixed berries', c: 380 },
                { time: '🥗 Lunch', title: 'Quinoa Bowl & Chickpeas', desc: 'Steamed quinoa, chickpeas, roasted pepper', c: 620 },
                { time: '🥩 Dinner', title: 'Sirloin Steak & Potato', desc: '200g lean sirloin steak, sweet potato, broccoli', c: 1050 }
            ]
        },
        wednesday: {
            day: 'Wednesday', calories: 1980, meals: [
                { time: '🍳 Breakfast', title: 'Protein Oatmeal Bowl', desc: 'Oats, whey protein powder, sliced bananas', c: 450 },
                { time: '🥗 Lunch', title: 'Tuna Salad Wrap', desc: 'Whole wheat wrap, canned tuna, light mayo', c: 510 },
                { time: '🥩 Dinner', title: 'Baked Cod & Wild Rice', desc: 'Cod fillet, wild rice, baked zucchini', c: 1020 }
            ]
        },
        thursday: {
            day: 'Thursday', calories: 1890, meals: [
                { time: '🍳 Breakfast', title: 'Spinach Egg Omelette', desc: '3 egg whites, 1 whole egg, baby spinach', c: 310 },
                { time: '🥗 Lunch', title: 'Turkey & Cheese Sandwich', desc: 'Whole grain bread, sliced turkey breast, provolone', c: 680 },
                { time: '🥩 Dinner', title: 'Garlic Butter Shrimp Pasta', desc: 'Tiger prawns, whole wheat pasta, garlic olive oil', c: 900 }
            ]
        },
        friday: {
            day: 'Friday', calories: 2100, meals: [
                { time: '🍳 Breakfast', title: 'French Toast & Berries', desc: '2 slices wheat toast dipped in egg whites', c: 440 },
                { time: '🥗 Lunch', title: 'Mediterranean Hummus Plate', desc: 'Falafel, hummus, cucumber slices, pita bread', c: 660 },
                { time: '🥩 Dinner', title: 'BBQ Grilled Chicken Breast', desc: '200g grilled chicken, baked beans, coleslaw', c: 1000 }
            ]
        }
    };
    let selectedDay = 'monday';
    function renderMealPlan(dayKey) {
        if (!mealPlans[dayKey]) return;
        const plan = mealPlans[dayKey];
        mealCurrentDay.textContent = `${plan.day} Meals`;
        mealCalSum.textContent = `Total Calories: ${plan.calories} kcal`;
        
        mealListContainer.innerHTML = '';
        plan.meals.forEach(m => {
            const item = document.createElement('div');
            item.className = 'meal-card-item';
            item.innerHTML = `
                <span class="meal-time">${m.time}</span>
                <div class="meal-details">
                    <h5>${m.title}</h5>
                    <p>${m.desc}</p>
                </div>
                <span class="meal-calories">${m.c} kcal</span>
            `;
            mealListContainer.appendChild(item);
        });
    }
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDay = btn.getAttribute('data-day');
            renderMealPlan(selectedDay);
        });
    });
    if (mealRegenerateBtn) {
        const alternateMeals = [
            { time: '🍳 Breakfast', title: 'Berry Smoothie Bowl', desc: 'Acai berry puree, chia seeds, sliced strawberries', c: 350 },
            { time: '🥗 Lunch', title: 'Tempeh Teriyaki Salad', desc: '150g grilled tempeh, bell peppers, teriyaki sauce', c: 590 },
            { time: '🥩 Dinner', title: 'Lamb Kebabs & Tabbouleh', desc: 'Skewered lamb, cracked wheat salad, mint yoghurt', c: 920 }
        ];
        mealRegenerateBtn.addEventListener('click', () => {
            // Animate spin effect
            mealRegenerateBtn.textContent = '↻ Generating...';
            mealRegenerateBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                mealPlans[selectedDay].meals = [...alternateMeals];
                mealPlans[selectedDay].calories = 1860;
                renderMealPlan(selectedDay);
                
                mealRegenerateBtn.textContent = '↻ Regenerate Day';
                mealRegenerateBtn.style.pointerEvents = 'auto';
            }, 600);
        });
    }
    // -----------------------------------------------------------------
    // App Interaction 4: Learning Hub Course Progression Simulator
    // -----------------------------------------------------------------
    const learningContinueBtn = document.getElementById('learning-continue-btn');
    const xpCounter = document.querySelector('.app-xp-counter');
    const jsCourseProgressBar = document.getElementById('js-course-progress-bar');
    const jsCoursePercentage = document.getElementById('js-course-percentage');
    const currentLessonRow = document.getElementById('current-lesson-row');
    let currentXp = 2450;
    let isProgressing = false;
    if (learningContinueBtn && xpCounter && jsCourseProgressBar && jsCoursePercentage && currentLessonRow) {
        learningContinueBtn.addEventListener('click', () => {
            if (isProgressing) return;
            isProgressing = true;
            
            // Advance progress bar
            let percentage = parseInt(jsCoursePercentage.textContent);
            if (percentage >= 100) {
                alert('Course already completed! Great job.');
                isProgressing = false;
                return;
            }
            percentage += 8;
            if (percentage > 100) percentage = 100;
            
            jsCoursePercentage.textContent = `${percentage}%`;
            jsCourseProgressBar.style.width = `${percentage}%`;
            
            // Award XP
            currentXp += 50;
            xpCounter.textContent = `⭐ ${currentXp} XP`;
            xpCounter.style.transform = 'scale(1.1)';
            setTimeout(() => xpCounter.style.transform = 'scale(1)', 200);
            if (percentage === 100) {
                // Complete lesson row
                currentLessonRow.className = 'lesson-row completed';
                const icon = currentLessonRow.querySelector('.lesson-icon');
                icon.textContent = '✓';
                icon.style.color = 'var(--success)';
                
                learningContinueBtn.textContent = 'Course Completed! 🎉';
                learningContinueBtn.classList.remove('btn-primary');
                learningContinueBtn.classList.add('btn-secondary');
            }
            
            setTimeout(() => {
                isProgressing = false;
            }, 300);
        });
    }
    // -----------------------------------------------------------------
    // App Interaction 5: Outdoor Adventure Planner checkboxes
    // -----------------------------------------------------------------
    const checklistContainer = document.getElementById('gear-checklist-container');
    if (checklistContainer) {
        checklistContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('gear-checkbox')) {
                const label = e.target.closest('.checklist-item');
                if (label) {
                    if (e.target.checked) {
                        label.classList.add('checked');
                    } else {
                        label.classList.remove('checked');
                    }
                }
            }
        });
    }
    // -----------------------------------------------------------------
    // 6. Pricing Tier Toggle (Monthly / Yearly) & Accordion Expand
    // -----------------------------------------------------------------
    const billingToggle = document.getElementById('pricing-billing-toggle');
    const pricePro = document.getElementById('price-pro');
    const billingMonthly = document.getElementById('billing-monthly');
    const billingYearly = document.getElementById('billing-yearly');
    const pricePeriodPro = document.getElementById('price-period-pro');
    const tablePricePro = document.querySelector('.table-price-pro');
    if (billingToggle && pricePro) {
        billingToggle.addEventListener('click', () => {
            billingToggle.classList.toggle('active');
            
            const isYearly = billingToggle.classList.contains('active');
            
            if (isYearly) {
                pricePro.textContent = '16';
                if (pricePeriodPro) pricePeriodPro.innerHTML = '/month <span style="font-size:0.75rem; display:block; color:var(--success); font-weight:500;">Billed yearly ($192)</span>';
                if (tablePricePro) tablePricePro.textContent = '$16/mo';
                billingMonthly.classList.remove('active');
                billingYearly.classList.add('active');
            } else {
                pricePro.textContent = '20';
                if (pricePeriodPro) pricePeriodPro.textContent = '/month';
                if (tablePricePro) tablePricePro.textContent = '$20/mo';
                billingMonthly.classList.add('active');
                billingYearly.classList.remove('active');
            }
        });
    }
    // Comparison Table Reveal
    const seeAllPlansBtn = document.getElementById('see-all-plans-btn');
    const comparisonTable = document.getElementById('comparison-table');
    
    if (seeAllPlansBtn && comparisonTable) {
        seeAllPlansBtn.addEventListener('click', () => {
            comparisonTable.classList.toggle('active');
            
            if (comparisonTable.classList.contains('active')) {
                seeAllPlansBtn.textContent = 'Hide comparison table ▴';
            } else {
                seeAllPlansBtn.textContent = 'See all features & comparison table ▾';
            }
        });
    }
    // -----------------------------------------------------------------
    // 7. Modal Form Triggers (Close & Open)
    // -----------------------------------------------------------------
    const contactModal = document.getElementById('contact-modal');
    const contactEnterpriseBtn = document.getElementById('contact-enterprise-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (contactModal && contactEnterpriseBtn && modalCloseBtn) {
        contactEnterpriseBtn.addEventListener('click', () => {
            contactModal.classList.add('active');
        });
        modalCloseBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });
        // Close when clicking modal backdrop
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
        });
    }
    // -----------------------------------------------------------------
    // 8. FAQ Accordion Height transition
    // -----------------------------------------------------------------
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const answerId = trigger.getAttribute('aria-controls');
            const answerWrapper = document.getElementById(answerId);
            
            // Toggle current accordion state
            trigger.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                // Expanding current panel
                if (answerWrapper) {
                    answerWrapper.style.maxHeight = `${answerWrapper.scrollHeight}px`;
                }
            } else {
                // Collapsing current panel
                if (answerWrapper) {
                    answerWrapper.style.maxHeight = '0px';
                }
            }
            
            // Optional: collapse other open accordions (uncomment for strict accordion behavior)
            /*
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger && otherTrigger.getAttribute('aria-expanded') === 'true') {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherAnswer = document.getElementById(otherTrigger.getAttribute('aria-controls'));
                    if (otherAnswer) otherAnswer.style.maxHeight = '0px';
                }
            });
            */
        });
    });
});
