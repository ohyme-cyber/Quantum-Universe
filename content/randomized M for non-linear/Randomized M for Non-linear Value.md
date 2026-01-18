---
tags:
  - Designed-M
  - Randomized-M
  - Non-Linear-Value
title: Randomized M for Non-linear Value
date: 2026-01-18
---
1. 本文目标：
![[Pasted image 20260118233812.png]]
2. 传统Randomized Measurement：$\mathrm{Tr}(\rho^2)$

对 $\rho$ 施加一个 $U\sim Haar$, 如果是纯态，其在随机基底下的概率分布会涨落大；反之如果是 $\rho\sim I$, 概率分布涨落会很小，因此可以利用其二阶矩来估算纯度。
$$\mathbb{E}_U \left[ \sum_s P_U(s)^2 \right] = \frac{2}{d+1} \text{Tr}(\rho^2) + \frac{1}{d+1} (\text{Tr}\rho)^2.$$

3. 对于可观测量 $O$, 如果是二分可观测量，即本征值为 +1 和 -1，那么在其本征基下，
$$O = \begin{bmatrix} I_{d_+} & 0 \\ 0 & -I_{d_-} \end{bmatrix}$$
并且 $\rho$ 在 $O$ 的本征基下，
$$\rho = \begin{bmatrix} \tilde{\rho}_+ & B \\ B^\dagger & \tilde{\rho}_- \end{bmatrix}$$
其中 $\tilde{\rho}_+ = P_+ \rho P_+$ ，$\tilde{\rho}_- = P_- \rho P_-$ 。
那么此时$$\text{Tr}(O\rho^2) = \text{Tr}(\tilde{\rho}_+^2 + B B^\dagger) - \text{Tr}(\tilde{\rho}_-^2 + B^\dagger B)= \text{Tr}(\tilde{\rho}_+^2) - \text{Tr}(\tilde{\rho}_-^2).$$
即计算非线性量的任务转化为估算纯度的任务。

4. 对于更general的可观测量，可以证明：$$O = \sum_{k=1}^M c_k D_k,$$其中每个 $D_k$ 是二分可观测量。可以将 $c_{k}$ 对应的权重看做概率分布，根据这个概率分布抽样决定对哪一个二分可观测量观测。

5. 电路实现：