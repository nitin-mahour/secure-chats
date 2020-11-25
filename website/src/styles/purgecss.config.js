module.exports = {
    content: ['**/*.js'],
    css: ['styles/tailwind.dev.css'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    output: 'styles/tailwind.css'
}