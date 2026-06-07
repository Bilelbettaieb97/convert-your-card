import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

async function main() {
  const plans = [
    {
      key: 'starter',
      name: 'Starter',
      description: 'Carte NFC digitale + thèmes personnalisés + capture de leads',
      monthly: 600,   // €6/mois
      annual: 4500,   // €4.50/mois = €54/an (billed yearly = 5400 cents)
      trial: false,
    },
    {
      key: 'pro',
      name: 'Pro',
      description: 'Cartes illimitées + stats avancées + intégrations CRM',
      monthly: 1300,  // €13/mois
      annual: 10500,  // €10.50/mois = €126/an
      trial: true,
    },
    {
      key: 'premium',
      name: 'Premium',
      description: 'Gestion équipe + branding entreprise + API + compte manager dédié',
      monthly: 3200,  // €32/mois
      annual: 27500,  // €27.50/mois = €330/an
      trial: true,
    },
  ]

  const results = {}

  for (const plan of plans) {
    console.log(`\nCreating product: ${plan.name}...`)

    const product = await stripe.products.create({
      name: `Convert Your Card — ${plan.name}`,
      description: plan.description,
      metadata: { plan: plan.key },
    })

    console.log(`  Product: ${product.id}`)

    // Prix mensuel
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      currency: 'eur',
      unit_amount: plan.monthly,
      recurring: { interval: 'month' },
      metadata: { plan: plan.key, billing: 'monthly' },
      ...(plan.trial ? { } : {}),
    })
    console.log(`  Monthly price: ${monthlyPrice.id} (€${plan.monthly/100}/mois)`)

    // Prix annuel (facturé annuellement = mensuel * 12 arrondi)
    const annualAmount = Math.round(plan.annual * 12 / 100) * 100  // annual rate × 12
    const annualPrice = await stripe.prices.create({
      product: product.id,
      currency: 'eur',
      unit_amount: annualAmount,
      recurring: { interval: 'year' },
      metadata: { plan: plan.key, billing: 'annual' },
    })
    console.log(`  Annual price: ${annualPrice.id} (€${annualAmount/100}/an)`)

    results[plan.key] = {
      monthly: monthlyPrice.id,
      annual: annualPrice.id,
    }
  }

  console.log('\n\n✅ Done! Add these to your .env.local:\n')
  for (const [plan, prices] of Object.entries(results)) {
    console.log(`STRIPE_PRICE_${plan.toUpperCase()}_MONTHLY=${prices.monthly}`)
    console.log(`STRIPE_PRICE_${plan.toUpperCase()}_ANNUAL=${prices.annual}`)
  }
}

main().catch(console.error)
