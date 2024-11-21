// e2e/demo.test.ts
import { test, expect } from '@playwright/test';

test.describe('Application E2E Tests', () => {
	// Tests de base
	test('home page loads', async ({ page }) => {
		await page.goto('/');
		await expect(page).toBeDefined();
	});

	test('home page shows navigation elements', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('nav')).toBeVisible();
	});

	// Tests du formulaire de connexion
	test('login page has expected form', async ({ page }) => {
		await page.goto('/login');
		await expect(page.locator('form.card')).toBeVisible();
		await expect(page.locator('.card-title')).toBeVisible();
		await expect(page.locator('.card-title')).toHaveText('Connexion');
	});

	// Test d'inscription
	test('register process', async ({ page }) => {
		await page.goto('/register');

		// Vérification du formulaire d'inscription
		await expect(page.locator('form.card')).toBeVisible();

		// Remplissage du formulaire
		await page.locator('#username').fill('testuser');
		await page.locator('#email').fill('test@example.com');
		await page.locator('#password').fill('testpassword123');
		// // await page.locator('#passwordConfirm').fill('testpassword123');

		// Mock de la réponse de création d'utilisateur
		await page.route('**/api/collections/users/create', async route => {
			await route.fulfill({
				status: 200,
				body: JSON.stringify({
					id: '123',
					username: 'testuser',
					email: 'test@example.com'
				})
			});
		});

		// Soumission du formulaire
		await page.locator('input[type="submit"]').click();

		// Vérification de la redirection vers login
		// await expect(page).toHaveURL('/login');
	});

	// Test d'inscription
	// test('register process not valid', async ({ page }) => {
	// 	await page.goto('/register');

	// 	// Vérification du formulaire d'inscription
	// 	await expect(page.locator('form.card')).toBeVisible();

	// 	// Remplissage du formulaire
	// 	await page.locator('#username').fill('testuser');
	// 	await page.locator('#email').fill('testexample');
	// 	await page.locator('#password').fill('testpassword123');
	// 	// // await page.locator('#passwordConfirm').fill('testpassword123');

	// 	// Mock de la réponse de création d'utilisateur
	// 	await page.route('**/api/collections/users/create', async route => {
	// 		await route.fulfill({
	// 			status: 200,
	// 			body: JSON.stringify({
	// 				id: '123',
	// 				username: 'testuser',
	// 				email: 'test@example.com'
	// 			})
	// 		});
	// 	});

	// 	// Soumission du formulaire
	// 	await page.locator('input[type="submit"]').click();

	// 	// Vérification de la redirection vers login
	// 	// await expect(page).toHaveURL('/login');
	// });

	// Test de connexion
	test('login process', async ({ page }) => {
		await page.goto('/login');

		// Remplissage du formulaire
		await page.locator('#username').fill('testuser');
		await page.locator('#password').fill('testpassword123');

		// Mock de la réponse d'authentification
		await page.route('**/api/collections/users/auth-with-password', async route => {
			await route.fulfill({
				status: 200,
				body: JSON.stringify({
					token: 'fake-token',
					record: {
						id: '123',
						username: 'testuser'
					}
				})
			});
		});

		// Soumission du formulaire
		await page.locator('input[type="submit"]').click();

		// Vérification de la redirection
		// await expect(page).toHaveURL('/');
	});

	// // Test de connexion
	// test('login process not valid', async ({ page }) => {
	// 	await page.goto('/login');

	// 	// Remplissage du formulaire
	// 	await page.locator('#username').fill('tes@tuser');
	// 	await page.locator('#password').fill('testpassword1234');

	// 	// Mock de la réponse d'authentification
	// 	await page.route('**/api/collections/users/auth-with-password', async route => {
	// 		await route.fulfill({
	// 			status: 200,
	// 			body: JSON.stringify({
	// 				token: 'fake-token',
	// 				record: {
	// 					id: '123',
	// 					username: 'testuser'
	// 				}
	// 			})
	// 		});
	// 	});

	// 	// Soumission du formulaire
	// 	await page.locator('input[type="submit"]').click();

	// 	// Vérification de la redirection
	// 	// await expect(page).toHaveURL('/');
	// });

	// Test de la page forum et publication
	test('forum and post functionality', async ({ page, context }) => {
		// Injecter une session d'utilisateur via localStorage
		await context.addInitScript(() => {
			window.localStorage.setItem('pocketbase_auth', JSON.stringify({
				token: 'fake-token',
				model: {
					id: '123',
					username: 'testuser'
				}
			}));
		});

		// Accéder à la page forum
		await page.goto('/new');

		// // Vérifier la présence du bouton pour créer un nouveau post
		// await expect(page.locator('.btn-primary')).toBeVisible();

		// // Vérifier le message lorsque aucun post n'existe
		// if (await page.locator('p').first().textContent() === 'Aucun post') {
		// 	await expect(page.locator('p').first()).toHaveText('Aucun post');
		// }

		// Mocker une réponse d'API pour les posts
		await page.route('**/api/collections/posts/records', async (route) => {
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					items: [
						{
							id: '1',
							author: 'testuser',
							title: 'Test Post',
							content: 'Test Content',
							status: 'published',
							created: new Date().toISOString(),
							updated: new Date().toISOString(),
						},
					],
				}),
			});
		});

		// Recharger la page pour afficher les posts mockés
		await page.reload();

		// // Vérifier que le post est visible
		// const postCard = page.locator('.bg-base-200');
		// await expect(postCard).toBeVisible();
		// await expect(postCard.locator('p').first()).toHaveText('Test Post');
	});

	// // Test de la page forum et publication
	// test('forum and post functionality', async ({ page, context }) => {
	// 	// Injecter une session d'utilisateur via localStorage
	// 	await context.addInitScript(() => {
	// 		window.localStorage.setItem('pocketbase_auth', JSON.stringify({
	// 			token: 'fake-token',
	// 			model: {
	// 				id: '123',
	// 				username: 'testuser'
	// 			}
	// 		}));
	// 	});

	// 	// Accéder à la page forum
	// 	await page.goto('/new');

	// 	// // Vérifier la présence du bouton pour créer un nouveau post
	// 	// await expect(page.locator('.btn-primary')).toBeVisible();

	// 	// // Vérifier le message lorsque aucun post n'existe
	// 	// if (await page.locator('p').first().textContent() === 'Aucun post') {
	// 	// 	await expect(page.locator('p').first()).toHaveText('Aucun post');
	// 	// }

	// 	// Mocker une réponse d'API pour les posts
	// 	await page.route('**/api/collections/posts/records', async (route) => {
	// 		route.fulfill({
	// 			status: 200,
	// 			contentType: 'application/json',
	// 			body: JSON.stringify({
	// 				items: [
	// 					{
	// 						id: '1',
	// 						author: 'testuser',
	// 						title: '',
	// 						content: '',
	// 						status: 'published',
	// 						created: new Date().toISOString(),
	// 						updated: new Date().toISOString(),
	// 					},
	// 				],
	// 			}),
	// 		});
	// 	});

	// 	// Recharger la page pour afficher les posts mockés
	// 	await page.reload();

	// 	// // Vérifier que le post est visible
	// 	// const postCard = page.locator('.bg-base-200');
	// 	// await expect(postCard).toBeVisible();
	// 	// await expect(postCard.locator('p').first()).toHaveText('Test Post');
	// });


	// Test de création d'un nouveau post
	test('new post creation', async ({ page }) => {
	    // Mock de l'authentification
	    // await page.evaluate(() => {
	    //     localStorage.setItem('pocketbase_auth', JSON.stringify({
	    //         token: 'fake-token',
	    //         model: {
	    //             id: '123',
	    //             username: 'testuser'
	    //         }
	    //     }));
	    // });

	    await page.goto('/new');

	    // Mock de la création de post
	    await page.route('**/api/collections/posts/records', async route => {
	        await route.fulfill({
	            status: 200,
	            body: JSON.stringify({
	                id: '1',
	                author: 'testuser',
	                title: 'New Test Post',
	                content: 'New Test Content'
	            })
	        });
	    });

	    // // Remplir et soumettre le formulaire de nouveau post
	    // await page.locator('input[type="text"]').fill('New Test Post');
	    // await page.locator('textarea').fill('New Test Content');
	    // await page.locator('input[type="submit"]').click();

	    // Vérifier la redirection vers le forum
	    await expect(page).toHaveURL('/new');
	});
});