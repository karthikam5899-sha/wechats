export default function Avatar({ src, name = 'User', size = 'md', online = false, ring = false }) {
  const sizes = { xs: 'h-8 w-8', sm: 'h-10 w-10', md: 'h-11 w-11', lg: 'h-16 w-16', xl: 'h-24 w-24' }
  return <span className="relative inline-flex shrink-0">
    <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ${ring ? 'ring-2 ring-brand ring-offset-2' : ''}`} />
    {online && <i className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />}
  </span>
}
