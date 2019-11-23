import test from 'ava'
import { shallowMount } from '@vue/test-utils'
import Login from '@/pages/login.vue'


test('Should load page', t=>{
  const wrapper = shallowMount(Login)
  t.is(wrapper.isVueInstance(),true)
})

test('Should be able to manipulate data', t=>{
  const wrapper = shallowMount(Login)
  wrapper.setData({ email: 'New Data' })
  t.is(wrapper.vm.$data.email,'New Data')
})


import Register from '@/pages/register.vue'


test('Should load page Register', t=>{
  const wrapper = shallowMount(Register)
  t.is(wrapper.isVueInstance(),true)
})

test('Should be able to manipulate data Register', t=>{
  const wrapper = shallowMount(Register)
  wrapper.setData({ email: 'New Data' })
  t.is(wrapper.vm.$data.email,'New Data')
})