const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

for (const f of files) {
  const file = path.join(publicDir, f);
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace navigation links
  content = content.replace(/href="#"([^>]*)>Dashboard<\/a>/gi, 'href="/dashboard.html"$1>Dashboard</a>');
  content = content.replace(/href="#"([^>]*)>Transactions<\/a>/gi, 'href="/transactions.html"$1>Transactions</a>');
  content = content.replace(/href="#"([^>]*)>Insights<\/a>/gi, 'href="/time_machine.html"$1>Insights</a>');
  content = content.replace(/href="#"([^>]*)>Goals<\/a>/gi, 'href="/goals.html"$1>Goals</a>');
  
  // Link the top left logo to home
  content = content.replace(
    /(<span class="[^"]*text-[#040c21][^"]*">)Flux(<\/span>)/gi,
    '$1<a href="/index.html">Flux</a>$2'
  );
  
  // Link "Get Started for Free" buttons to login page
  content = content.replace(
    /(<button[^>]*>[^<]*Get Started for Free[^<]*<\/button>)/gi,
    '<a href="/login.html">$1</a>'
  );

  // Link "View Demo" to dashboard
  content = content.replace(
    /(<button[^>]*>[^<]*View Demo[^<]*<\/button>)/gi,
    '<a href="/dashboard.html">$1</a>'
  );

  fs.writeFileSync(file, content);
  console.log(`Updated links in ${f}`);
}
